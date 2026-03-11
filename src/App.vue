<template>
  <div class="app-shell">
    <header class="nav">
      <div class="container nav__inner">
        <RouterLink class="brand" to="/">
          <span class="brand__dot" aria-hidden="true"></span>
          <span class="brand__text">MySite</span>
        </RouterLink>

        <nav class="nav__links" aria-label="Primary">
          <RouterLink to="/" class="nav__link">首页</RouterLink>
          <RouterLink to="/projects" class="nav__link">项目</RouterLink>
          <RouterLink to="/about" class="nav__link">关于</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container main">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <span class="muted">© {{ new Date().getFullYear() }} MySite</span>
        <span class="muted">Built with Vue + Vite</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
