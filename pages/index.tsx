import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import Heading from '../components/heading'
import PostList from '../components/postList'
import { getAllPostsSorted, PostData } from '../lib/posts'

interface HomeProps {
  allPosts: PostData[]
}

const Home: NextPage<HomeProps> = ({ allPosts }) => {
  const pageTitle = 'Blog'
  const metaDescription = 'Blog'
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-col gap-8">
        <Heading level={1}>{`All posts`}</Heading>
        <PostList posts={allPosts} />
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPostsSorted()

  return {
    props: {
      allPosts,
    },
  }
}

export default Home
