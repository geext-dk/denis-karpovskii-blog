import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData, PostData } from '../lib/posts'
import { ReactNode } from 'react'
import Head from 'next/head'
import PostContent from '../components/postContent'
import Heading from '../components/heading'
import stringToId from '../lib/utils/stringToId'
import TagIcon from '../assets/icons/tag.svg'
import Link from '../components/link'

export interface PostProps {
  post: PostData
}

export default function Post({ post }: PostProps): ReactNode {
  return (
    <article className="max-w-[calc(100vw-4rem)]">
      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="max-w-prose">
        <div className="pb-8 flex flex-col gap-4">
          <Heading id={stringToId(post.title)} level={1}>
            {post.title}
          </Heading>
          <div className="flex justify-between">
            <div>{post.date}</div>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex gap-2">
                {post.tags.length > 0
                  ? post.tags.map((tag) => (
                      <Link
                        href={`/tag/${tag}`}
                        key={tag}
                        className="text-gray-500"
                      >
                        {tag}
                      </Link>
                    ))
                  : null}
              </div>
              <TagIcon className="w-[1.25em] h-[1.25em] mt-1" />
            </div>
          </div>
        </div>
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
