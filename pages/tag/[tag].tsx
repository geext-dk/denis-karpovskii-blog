import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllPostsSorted, PostData } from '../../lib/posts'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Heading from '../../components/heading'
import PostList from '../../components/postList'

interface TagProps {
  tagPosts: PostData[]
}

const Tag: NextPage<TagProps> = ({ tagPosts }) => {
  const router = useRouter()
  const { tag } = router.query

  const pageTitle = `Posts by tag '${tag}'`
  const metaDescription = `Posts by tag '${tag}'`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-col gap-8">
        <Heading level={1}>{`Posts by tag '${tag}'`}</Heading>
        <PostList posts={tagPosts} />
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<TagProps> = ({ params }) => {
  if (params?.tag && !Array.isArray(params.tag)) {
    const tag = params.tag

    try {
      const tagPosts = getAllPostsSorted().filter((p) => p.tags.includes(tag))

      return {
        props: {
          tagPosts,
        },
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error('An error occurred when gettign post data: ', e.message)
      }
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPostsSorted()
  const set = new Set(posts.flatMap((p) => p.tags))

  return {
    paths: Array.from(set).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export default Tag
