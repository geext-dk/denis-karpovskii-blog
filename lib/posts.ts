import * as fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')
const draftsDirectoryName = 'drafts'
const draftsDirectory = path.join(postsDirectory, draftsDirectoryName)

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

const postFileNameRegex = /\d{4}-\d{2}-\d{2}-[-a-z]+\.md/

const draftsEnabled = process.env.NODE_ENV === 'development'

function fileNameToPostId(fileName: string): string {
  if (!postFileNameRegex.test(fileName)) {
    throw new Error(`The post with file name ${fileName} has invalid name`)
  }

  const fileNameWithoutExtension = fileName.substring(
    0,
    fileName.lastIndexOf('.')
  )

  return fileNameWithoutExtension.split('-').slice(3).join('-')
}

function getAllPostFileNames(): string[] {
  let fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fn) => fn != draftsDirectoryName)

  if (draftsEnabled) {
    fileNames = [...fs.readdirSync(draftsDirectory), ...fileNames]
  }

  return fileNames
}

export function getPostData(id: string): PostData {
  const fileName = getAllPostFileNames().find(
    (fn) => fileNameToPostId(fn) == id
  )

  if (!fileName) {
    throw new Error(`Couldn't find post with id ${id}`)
  }

  const fullPath = path.join(postsDirectory, fileName)
  const draftPath = path.join(draftsDirectory, fileName)
  const fileContents = fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf-8')
    : draftsEnabled && fs.existsSync(draftPath)
    ? fs.readFileSync(draftPath, 'utf-8')
    : null

  if (!fileContents) {
    throw new Error(`Couldn't find file with name ${fileName}`)
  }

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
  const postIds = getAllPostIds()

  const allPostsData: PostData[] = []

  for (const postId of postIds) {
    try {
      const postData = getPostData(postId)
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
  return getAllPostFileNames().map(fileNameToPostId)
}
