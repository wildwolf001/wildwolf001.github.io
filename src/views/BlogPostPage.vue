<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'
import { getPostBySlug } from '../blog/posts'
import { useProfileStore } from '../stores/profile'

const profile = useProfileStore()
const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const post = computed(() => getPostBySlug(slug.value))

const html = computed(() => {
  if (!post.value) return ''
  return marked.parse(post.value.body) as string
})

onMounted(() => {
  document.title = post.value ? `${post.value.title} · ${profile.name}` : `博客 · ${profile.name}`
})
</script>

<template>
  <section class="section">
    <div class="section__head">
      <div>
        <h1 class="h2">文章</h1>
        <p class="muted">
          <RouterLink class="link" to="/blog">← 返回博客列表</RouterLink>
        </p>
      </div>
    </div>

    <div v-if="!post" class="card">
      <h3 class="h3">文章不存在</h3>
      <p class="muted">请检查链接是否正确，或确认对应的 md 文件已放在 <code>src/content/blog/</code>。</p>
      <RouterLink class="btn btn--primary" to="/blog">返回列表</RouterLink>
    </div>

    <article v-else class="article card">
      <header class="article__head">
        <h1 class="article__title">{{ post.title }}</h1>
        <div class="article__meta">
          <span v-if="post.date" class="meta">{{ post.date }}</span>
          <span v-for="t in post.tags" :key="t" class="chip chip--small">{{ t }}</span>
        </div>
        <p v-if="post.summary" class="muted">{{ post.summary }}</p>
      </header>

      <div class="article__body" v-html="html"></div>
    </article>
  </section>
</template>

