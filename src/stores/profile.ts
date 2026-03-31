import { defineStore } from 'pinia'

export type SocialLink = {
  label: string
  href: string
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: 'Yangli',
    title: '有头发的程序猿· Vue/TypeScript/java/langchain4j/transformer...',
    tagline:
      '忠于人民忠于党，热爱祖国热爱人民，热爱学习热爱工作，热爱生活热爱一切美好的事物！',
    location: 'China',
    email: '2404049355@qq.com',

    // 用于从 GitHub API 拉取仓库列表
    githubUsername: 'wildwolf001',

    skills: [
      { name: 'Vue', href: 'https://vuejs.org' },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org' },
      { name: 'Node.js', href: 'https://nodejs.org' },
      { name: 'Java', href: 'https://www.oracle.com/java/' },
      { name: 'langchain4j', href: 'https://github.com/langchain/langchain4j' },
      { name: 'Python', href: 'https://www.python.org' },
      { name: 'Transformers', href: 'https://github.com/huggingface/transformers' },
    ]as { name: string; href: string }[],


    social: [
      { label: 'GitHub', href: 'https://github.com/wildwolf001' },
      { label: 'QQ', value: '2404049355' },
      // { label: 'Blog', href: 'https://example.com' },
     { label: 'Email', href: '2404049355@qq.com' },
    ] as SocialLink[],
  }),
})

