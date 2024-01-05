import { PostData } from '../lib/posts'

import PostSummary from './postSummary'

export interface PostListItemProps {
  post: PostData
}

export default function PostListItem({ post }: PostListItemProps): JSX.Element {
  return (
    <li className="flex flex-col gap-2 max-w-prose">
      <PostSummary post={post} linkableTitle={true} titleLevel={2} />
      {post.excerpt && <div>{post.excerpt}</div>}
    </li>
  )
}
