import PostListItem from './postListItem'
import { PostData } from '../lib/posts'

export interface PostListProps {
  posts: PostData[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="flex flex-col gap-8">
      {posts.map((p) => (
        <PostListItem key={p.id} post={p} />
      ))}
    </ul>
  )
}
