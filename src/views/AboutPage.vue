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
        </p>
        <p class="muted">
          无
        </p>
      </div>

      <div class="card">
        <h3 class="h3">技能栈</h3>
        <div class="chips">
        <a 
          v-for="s in profile.skills" 
          :key="s.name" 
          :href="s.href" 
          target="_blank" 
          rel="noreferrer"
          class="chip"
        >
          {{ s.name }}
        </a>
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

