import TagIcon from '../assets/icons/tag.svg'
import { PostData } from '../lib/posts'
import Date from './date'
import Heading from './heading'
import Link from './link'

interface PostSummaryProps {
  post: PostData
  linkableTitle: boolean
  titleLevel: number
  className?: string
}

export default function PostSummary({
  post,
  linkableTitle,
  titleLevel,
  className,
}: PostSummaryProps) {
  const title = <Heading level={titleLevel}>{post.title}</Heading>

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        {linkableTitle ? <Link href={`/${post.id}`}>{title}</Link> : title}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <TagIcon className="w-[1.25em] h-[1.25em] mt-1 shrink-0" />
          <div className="flex flex-wrap">
            {post.tags.length > 0
              ? post.tags.map((tag) => (
                  <Link
                    key={tag}
                    className="text-gray-500 mr-2"
                    href={`/tag/${tag}`}
                  >
                    {tag}
                  </Link>
                ))
              : null}
          </div>
        </div>
        <Date className="block pt-2 sm:pt-0" dateString={post.date} />
      </div>
    </div>
  )
}
