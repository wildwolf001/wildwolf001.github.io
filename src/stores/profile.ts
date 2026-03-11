import { defineStore } from 'pinia'

export type SocialLink = {
  label: string
  href: string
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: 'Yangli',
    title: '前端工程师 · Vue/TypeScript/ajax/java...',
    tagline:
      '全栈偏前端工程师，热爱开源，喜欢分享，专注于 Vue 生态，致力于构建高质量的 Web 应用。',
    location: 'China',
    email: '2404049355@qq.com',

    // 用于从 GitHub API 拉取仓库列表
    githubUsername: 'wildwolf001',

    skills: [
      { name: 'Vue', href: 'https://vuejs.org' },
      { name: 'React', href: 'https://reactjs.org' },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org' },
      { name: 'Node.js', href: 'https://nodejs.org' }
    ]as { name: string; href: string }[],


    social: [
      { label: 'GitHub', href: 'https://github.com/wildwolf001' },
      { label: 'QQ', value: '2404049355' },
      // { label: 'Blog', href: 'https://example.com' },
     { label: 'Email', href: '2404049355@qq.com' },
    ] as SocialLink[],
  }),
})

