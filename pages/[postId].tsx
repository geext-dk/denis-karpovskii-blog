import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import PostContent from '../components/postContent'
import PostSummary from '../components/postSummary'
import { PostData, getAllPostIds, getPostData } from '../lib/posts'

export interface PostProps {
  post: PostData
}

export default function Post({ post }: PostProps): ReactNode {
  return (
    <article className="max-w-[calc(100vw-4rem)]">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="max-w-prose">
        <PostSummary
          className="mb-2"
          post={post}
          linkableTitle={false}
          titleLevel={1}
        />
        <PostContent contentMarkdown={post.contentMarkdown} />
      </div>
    </article>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = ({ params }) => {
  if (params?.postId && !Array.isArray(params.postId)) {
    try {
      const postData = getPostData(params.postId)

      return {
        props: {
          post: postData,
        },
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error('An error occurred when getting post data: ', e.message)
      }
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const postIds = getAllPostIds()

  return {
    paths: postIds.map((postId) => ({
      params: {
        postId,
      },
    })),
    fallback: false,
  }
}
