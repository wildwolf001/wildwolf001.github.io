<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useProfileStore } from '../stores/profile'
import { blogPosts } from '../blog/posts'

const profile = useProfileStore()
const title = computed(() => `${profile.name} · 博客`)

onMounted(() => {
  document.title = title.value
})
</script>

<template>
  <section class="section">
    <div class="section__head">
      <div>
        <h1 class="h2">博客</h1>
        <p class="muted">把 Markdown 放进 <code>src/content/blog/</code> 就能发布。</p>
      </div>
      <span class="muted">共 {{ blogPosts.length }} 篇</span>
    </div>

    <div class="grid grid--blog">
      <RouterLink
        v-for="p in blogPosts"
        :key="p.slug"
        class="card"
        :to="`/blog/${p.slug}`"
      >
        <div class="card__top">
          <h3 class="h3">{{ p.title }}</h3>
          <span v-if="p.date" class="meta">{{ p.date }}</span>
        </div>
        <p v-if="p.summary" class="muted clamp-2">{{ p.summary }}</p>
        <div v-if="p.tags.length" class="chips chips--tight">
          <span v-for="t in p.tags" :key="t" class="chip chip--small">{{ t }}</span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

