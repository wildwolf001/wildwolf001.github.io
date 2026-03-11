import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 通常部署在子路径（repo 名）下；用相对路径能避免 base 配置踩坑
  // 同时配合 Hash Router，可避免刷新页面 404 的问题
  base: './',
  plugins: [vue()],
})

