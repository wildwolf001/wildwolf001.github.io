<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '../stores/profile'
import { fetchFeaturedRepos, type GithubRepo } from '../services/github'

const profile = useProfileStore()
const loading = ref(false)
const error = ref<string | null>(null)
const repos = ref<GithubRepo[]>([])

const title = computed(() => `${profile.name} · 项目`)

async function load() {
  loading.value = true
  error.value = null
  try {
    repos.value = await fetchFeaturedRepos(profile.githubUsername, 12)
  } catch (e) {
    error.value = '项目列表加载失败（网络/限流原因）。'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  document.title = title.value
  load()
})
</script>

<template>
  <section class="section">
    <div class="section__head">
      <div>
        <h1 class="h2">项目</h1>
        <p class="muted">从 GitHub 自动同步最近更新的仓库（可在配置里改用户名）。</p>
      </div>
      <a
        class="btn btn--ghost"
        :href="`https://github.com/${profile.githubUsername}`"
        target="_blank"
        rel="noreferrer"
      >
        打开 GitHub
      </a>
    </div>

    <p v-if="loading" class="muted">加载中…</p>
    <p v-else-if="error" class="toast toast--warn">{{ error }}</p>

    <div class="grid">
      <a
        v-for="r in repos"
        :key="r.id"
        class="card"
        :href="r.html_url"
        target="_blank"
        rel="noreferrer"
      >
        <div class="card__top">
          <h3 class="h3">{{ r.name }}</h3>
          <span class="pill" v-if="r.language">{{ r.language }}</span>
        </div>
        <p class="muted clamp-2">{{ r.description || '暂无描述。' }}</p>
        <div class="card__meta">
          <span class="meta">★ {{ r.stargazers_count }}</span>
          <span class="meta">⑂ {{ r.forks_count }}</span>
          <span class="meta">更新：{{ new Date(r.updated_at).toLocaleDateString() }}</span>
        </div>
      </a>
    </div>
  </section>
</template>

