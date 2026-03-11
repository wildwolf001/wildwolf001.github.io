---
title: GitHub Pages 部署记录
date: 2026-03-11
tags: [部署, GitHub]
summary: 记录一下把 Vite + Vue 项目部署到 GitHub Pages 的关键点。
---

这篇文章记录几个容易踩坑的点：

## 1. base 路径

如果部署到 GitHub Pages 子路径，`vite.config.ts` 建议使用：

- `base: './'`

## 2. 路由模式

GitHub Pages 纯静态站点刷新容易 404，因此这里用 **Hash 路由**：

- `createWebHashHistory()`

