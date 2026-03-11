# 个人网站（Vue3 + Vite + TS + Pinia + Axios）— 支持 GitHub Pages

一个美观、轻量、可直接部署为 **GitHub Pages 静态站点** 的个人主页模板。

## 技术栈

- **Vue 3**（SFC + `<script setup>`）
- **Vite**（构建/本地开发）
- **TypeScript**
- **Pinia**（个人信息配置、站点文案/链接等）
- **Axios**（AJAX；示例：拉取 GitHub 仓库列表）
- **Vue Router（Hash 模式）**：对 GitHub Pages 最友好，刷新不 404

## 本地开发

在 `personal-site` 目录下执行：

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

## 自定义内容（改这些就够）

编辑 `src/stores/profile.ts`：

- **name / title / tagline**：首页文案
- **githubUsername**：用于从 GitHub API 自动同步项目列表
- **skills / social**：技能标签与社交链接

页面文件：

- `src/views/HomePage.vue`
- `src/views/ProjectsPage.vue`
- `src/views/AboutPage.vue`

## 部署到 GitHub Pages（推荐：GitHub Actions）

本项目已内置工作流：`personal-site/.github/workflows/deploy.yml`

### 步骤

1. 推送到 GitHub（默认分支为 `main`）
2. 在仓库设置里开启 Pages：
   - **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**
3. 之后每次 `push main` 会自动构建并部署

### 说明（为什么能在 Pages 上稳定运行）

- `vite.config.ts` 使用 `base: './'`，适配 Pages 的子路径部署
- `vue-router` 使用 **Hash 路由**（`createWebHashHistory()`），避免刷新页面 404

## 常见问题

### GitHub 项目列表加载失败？

这通常是网络或 GitHub API 限流导致。页面会显示占位内容，不影响站点正常访问。

