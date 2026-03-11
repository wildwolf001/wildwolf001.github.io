import { http } from './http'

export type GithubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export async function fetchFeaturedRepos(username: string, limit = 6) {
  const { data } = await http.get<GithubRepo[]>(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
    {
      params: {
        per_page: Math.max(limit, 1),
        sort: 'updated',
        direction: 'desc',
      },
    },
  )

  return data.slice(0, limit)
}

