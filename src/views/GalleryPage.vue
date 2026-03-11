<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '../stores/profile'

type Photo = {
  id: string
  title: string
  url: string
  tag: string
}

const profile = useProfileStore()
const title = computed(() => `${profile.name} · 图库`)

const query = ref('')
const activeCategory = ref('全部')

/**
 * 本地图库（按文件夹分类）：
 * - 把图片放到 `src/assets/gallery/<分类名>/` 下即可自动出现在这里
 * - 例如：`src/assets/gallery/旅行/海边散步.jpg`
 * 支持常见格式：png/jpg/jpeg/webp/gif/svg
 */
const localImages = import.meta.glob<string>(
  '../assets/gallery/**/*.{png,jpg,jpeg,webp,gif,svg}',
  {
    eager: true,
    import: 'default',
  },
)

function filenameFromPath(p: string) {
  const name = p.split('/').pop() || p
  return name.replace(/\.[^.]+$/, '')
}

function categoryFromPath(p: string) {
  // p like "../assets/gallery/<category>/<filename>"
  const parts = p.split('/')
  const galleryIdx = parts.findIndex((x) => x === 'gallery')
  const category = galleryIdx >= 0 ? parts[galleryIdx + 1] : undefined
  return category || '未分类'
}

const photos = ref<Photo[]>(
  Object.entries(localImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url], idx) => {
      const base = filenameFromPath(path)
      const category = categoryFromPath(path)
      // 约定：文件名可用 `标题__标签.jpg`，例如：`海边散步__旅行.jpg`
      const [rawTitle, rawTag] = base.split('__')
      return {
        id: `local-${idx}`,
        title: rawTitle || base,
        tag: rawTag || category,
        url,
      }
    }),
)

const categories = computed(() => {
  const set = new Set<string>()
  for (const p of photos.value) set.add(p.tag)
  return ['全部', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return photos.value.filter((p) => {
    const passCategory = activeCategory.value === '全部' || p.tag === activeCategory.value
    if (!passCategory) return false
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    )
  })
})

onMounted(() => {
  document.title = title.value
})
</script>

<template>
  <section class="section">
    <div class="page-head">
      <div>
        <h1 class="h2">图库</h1>
        <p class="muted">白色系卡片布局，支持搜索与分类文件夹筛选（本地图片）。</p>
      </div>

      <div class="search">
        <input
          v-model="query"
          class="input"
          placeholder="搜索：旅行 / 设计 / 生活…"
          aria-label="Search gallery"
        />
      </div>
    </div>

    <div class="tabs" aria-label="Gallery categories">
      <button
        v-for="c in categories"
        :key="c"
        class="tab"
        :class="{ 'tab--active': c === activeCategory }"
        type="button"
        @click="activeCategory = c"
      >
        {{ c }}
      </button>
    </div>

    <div class="gallery">
      <div v-if="photos.length === 0" class="card">
        <h3 class="h3">还没有本地图片</h3>
        <p class="muted">
          把图片放到 <code>src/assets/gallery/分类名/</code> 目录下，然后重启 dev server 即可自动显示。
        </p>
        <p class="muted">
          你也可以用文件名覆盖标签：<code>海边散步__旅行.jpg</code>（会覆盖文件夹分类）
        </p>
      </div>

      <a
        v-for="p in filtered"
        :key="p.id"
        class="photo"
        :href="p.url"
        target="_blank"
        rel="noreferrer"
      >
        <div class="photo__img-wrap">
          <img class="photo__img" :src="p.url" :alt="p.title" loading="lazy" />
        </div>
        <div class="photo__meta">
          <div class="photo__title">{{ p.title }}</div>
          <div class="photo__tag">{{ p.tag }}</div>
        </div>
      </a>
    </div>
  </section>
</template>

