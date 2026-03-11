export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export type BlogPost = BlogPostMeta & {
  body: string
}

function parseFrontmatter(md: string) {
  const trimmed = md.trimStart()
  if (!trimmed.startsWith('---')) {
    return { meta: {}, body: md }
  }
  const end = trimmed.indexOf('\n---', 3)
  if (end === -1) {
    return { meta: {}, body: md }
  }

  const fmRaw = trimmed.slice(3, end).trim()
  const body = trimmed.slice(end + '\n---'.length).trimStart()

  // Minimal YAML-ish parser for our simple fields
  const meta: Record<string, unknown> = {}
  for (const line of fmRaw.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    meta[key] = value
  }
  return { meta, body }
}

function parseTags(v: unknown) {
  if (typeof v !== 'string') return []
  // supports: [a, b] OR a,b
  const s = v.trim()
  if (s.startsWith('[') && s.endsWith(']')) {
    return s
      .slice(1, -1)
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
  }
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
}

function stripQuotes(s: string) {
  const t = s.trim()
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1)
  }
  return t
}

// Load all markdown files in src/content/blog at build time.
const rawModules = import.meta.glob<string>('../content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

export const blogPosts: BlogPost[] = Object.entries(rawModules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || path
    const { meta, body } = parseFrontmatter(raw)

    const title = meta.title ? stripQuotes(String(meta.title)) : slug
    const date = meta.date ? stripQuotes(String(meta.date)) : ''
    const summary = meta.summary ? stripQuotes(String(meta.summary)) : ''
    const tags = parseTags(meta.tags)

    return {
      slug,
      title,
      date,
      tags,
      summary,
      body,
    }
  })
  .sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title))

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null
}

