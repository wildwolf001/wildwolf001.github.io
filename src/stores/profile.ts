import { defineStore } from 'pinia'

export type SocialLink = {
  label: string
  href: string
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: 'Yangli',
    title: '前端工程师 · Vue / TypeScript',
    tagline:
      '用清晰的架构与细节打磨，做出好看、好用、可维护的产品。',
    location: 'China',
    email: '2404049355@qq.com',

    // 用于从 GitHub API 拉取仓库列表
    githubUsername: 'wildwolf001',

    skills: ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'Axios', 'Node.js'] as string[],

    social: [
      { label: 'GitHub', href: 'https://github.com/wildwolf001' },
      { label: 'Blog', href: 'https://example.com' },
      { label: 'Email', href: 'mailto:you@example.com' },
    ] as SocialLink[],
  }),
})

