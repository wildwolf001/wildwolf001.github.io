<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '../stores/profile'
import { fetchFeaturedRepos, type GithubRepo } from '../services/github'

const profile = useProfileStore()

const loading = ref(false)
const error = ref<string | null>(null)
const repos = ref<GithubRepo[]>([])

const heroTitle = computed(() => profile.name)
const heroSubtitle = computed(() => profile.title)

async function load() {
  loading.value = true
  error.value = null
  try {
    repos.value = await fetchFeaturedRepos(profile.githubUsername, 6)
  } catch (e) {
    // 公开 GitHub API 在部分网络环境可能失败；站点仍应可用
    error.value = '项目列表加载失败（网络/限流原因），已显示占位内容。'
    repos.value = [
      {
        id: 1,
        name: 'awesome-portfolio',
        full_name: 'you/awesome-portfolio',
        html_url: '#',
        description: '一个干净、快速、可部署到 GitHub Pages 的个人站模板。',
        language: 'Vue',
        stargazers_count: 128,
        forks_count: 12,
        updated_at: new Date().toISOString(),
      },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="hero__content">
      <p class="badge">Vite · Vue3 · TypeScript · Pinia · Axios</p>
      <h1 class="h1">{{ heroTitle }}</h1>
      <p class="lead">{{ heroSubtitle }}</p>
      <p class="muted">{{ profile.tagline }}</p>

      <div class="hero__cta">
        <a class="btn btn--primary" href="#/projects">查看项目</a>
        <a class="btn btn--ghost" href="#/gallery">打开图库</a>
        <a class="btn btn--ghost" href="#/about">了解更多</a>
      </div>

      <div class="chips">
        <span v-for="s in profile.skills" :key="s" class="chip">{{ s }}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section__head">
      <h2 class="h2">精选项目</h2>
      <a class="link" href="#/projects">查看全部 →</a>
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

  <section class="section">
    <div class="section__head">
      <h2 class="h2">联系我</h2>
      <span class="muted">{{ profile.location }}</span>
    </div>
    <div class="row">
      <a
        v-for="s in profile.social"
        :key="s.href"
        class="card card--small"
        :href="s.href"
        target="_blank"
        rel="noreferrer"
      >
        <span class="h3">{{ s.label }}</span>
        <span class="muted truncate">{{ s.href }}</span>
      </a>
    </div>
  </section>
</template>

