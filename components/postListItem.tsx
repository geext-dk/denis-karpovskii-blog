import Heading from './heading'
import Date from './date'
import { PostData } from '../lib/posts'
import ReactMarkdown from 'react-markdown'

import TagIcon from '../assets/icons/tag.svg'
import Link from './link'

export interface PostListItemProps {
  post: PostData
}

export default function PostListItem({ post }: PostListItemProps): JSX.Element {
  return (
    <li className="flex flex-col gap-2 max-w-prose">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <Link href={`/${post.id}`}>
          <Heading level={2}>{post.title}</Heading>
        </Link>
        <Date className="sm:pt-2" dateString={post.date} />
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <TagIcon className="w-[1.25em] h-[1.25em] mt-1" />
        <div className="flex gap-2">
          {post.tags.length > 0
            ? post.tags.map((tag) => (
                <Link key={tag} className="text-gray-500" href={`/tag/${tag}`}>
                  {tag}
                </Link>
              ))
            : null}
        </div>
      </div>
      {post.excerptMarkdown && (
        <div>
          <ReactMarkdown>{post.excerptMarkdown}</ReactMarkdown>
        </div>
      )}
    </li>
  )
}
