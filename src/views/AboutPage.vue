<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'

const profile = useProfileStore()
const title = computed(() => `${profile.name} · 关于`)

onMounted(() => {
  document.title = title.value
})
</script>

<template>
  <section class="section">
    <div class="section__head">
      <div>
        <h1 class="h2">关于我</h1>
        <p class="muted">{{ profile.title }}</p>
      </div>
      <a class="btn btn--primary" :href="`mailto:${profile.email}`">给我发邮件</a>
    </div>

    <div class="two-col">
      <div class="card">
        <h3 class="h3">简介</h3>
        <p class="muted">
          这里是一段更长的自我介绍：你可以写你的经历、擅长方向、正在关注的技术，以及想做的产品类型。
        </p>
        <p class="muted">
          这个站点采用 Vite 构建、Vue3 + TypeScript 开发，状态管理用 Pinia，数据请求用 Axios，
          并可一键部署到 GitHub Pages。
        </p>
      </div>

      <div class="card">
        <h3 class="h3">技能栈</h3>
        <div class="chips">
          <span v-for="s in profile.skills" :key="s" class="chip">{{ s }}</span>
        </div>

        <div class="divider"></div>

        <h3 class="h3">社交链接</h3>
        <div class="row">
          <a
            v-for="s in profile.social"
            :key="s.href"
            class="link-card"
            :href="s.href"
            target="_blank"
            rel="noreferrer"
          >
            <span class="link-card__label">{{ s.label }}</span>
            <span class="muted truncate">{{ s.href }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

