import path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  date: string
  tags: string[]
  contentMarkdown: string
  excerpt?: string
}

interface PageFrontMatter {
  title?: string
  date?: string
  tags?: string[]
}

export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const matterResult = matter(fileContents, {
    excerpt: true,
  })

  const frontMatter: PageFrontMatter = matterResult.data

  if (!frontMatter.date || !frontMatter.title) {
    throw new Error(
      `Post ${id} doesn't have a title or date. FrontMatter: ${JSON.stringify(
        matterResult.data
      )}`
    )
  }

  const content = matterResult.excerpt
    ? matterResult.content.substring(matterResult.content.indexOf('---') + 3)
    : matterResult.content

  return {
    id,
    contentMarkdown: content,
    excerpt: matterResult.excerpt,
    title: frontMatter.title,
    date: frontMatter.date,
    tags: frontMatter.tags || [],
  }
}

export function getAllPostsSorted(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = []

  for (const fileName of fileNames) {
    const id = fileName.substring(0, fileName.lastIndexOf('.'))

    try {
      const postData = getPostData(id)
      allPostsData.push(postData)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fn) => fn.substring(0, fn.lastIndexOf('.')))
}
