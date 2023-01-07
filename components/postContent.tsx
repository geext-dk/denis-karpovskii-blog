import ReactMarkdown from 'react-markdown'
import {
  HeadingComponent,
  LiProps,
  OrderedListProps,
  UnorderedListProps,
} from 'react-markdown/lib/ast-to-react'
import Heading from './heading'
import nodeToString from '../lib/utils/nodeToString'
import Link from './link'
import stringToId from '../lib/utils/stringToId'
import Image from 'next/image'
import remarkUnwrapImages from 'remark-unwrap-images'

export interface PostContentProps {
  contentMarkdown: string
}

const headingPaddings: Record<number, string> = {
  1: 'my-8',
  2: 'my-6',
  3: 'my-5',
  4: 'my-4',
  5: 'my-3',
  6: 'my-2',
}

const MarkdownHeading: HeadingComponent = ({ level, ...props }) => {
  const headingId = stringToId(nodeToString(props.children))

  const padding = headingPaddings[level] || headingPaddings[1]

  return (
    <Heading id={headingId} level={level - 1} className={`${padding}`}>
      {props.children}
    </Heading>
  )
}

function Paragraph({ children }: JSX.IntrinsicElements['p']): JSX.Element {
  return <p className="mb-4">{children}</p>
}

function Em({ children }: JSX.IntrinsicElements['em']): JSX.Element {
  return <em>{children}</em>
}

function OrderedList({ children }: OrderedListProps): JSX.Element {
  return <ol className="ml-6 my-2 list-decimal">{children}</ol>
}

function UnorderedList({ children }: UnorderedListProps): JSX.Element {
  return <ul className="ml-6 my-2 list-disc">{children}</ul>
}

function ListItem({ children }: LiProps): JSX.Element {
  return <li className="mb-2 last:mb-0">{children}</li>
}

function A({ href, children }: JSX.IntrinsicElements['a']): JSX.Element {
  return (
    <Link className="text-blue-600" href={href || ''}>
      {children}
    </Link>
  )
}

function Hr({ children }: JSX.IntrinsicElements['hr']) {
  return <hr className="mb-8 mt-8">{children}</hr>
}

function Code({ children }: JSX.IntrinsicElements['code']) {
  return <code>{children}</code>
}

function Pre({ children }: JSX.IntrinsicElements['pre']) {
  return <pre className="overflow-auto">{children}</pre>
}

function Img({ src, alt }: JSX.IntrinsicElements['img']) {
  if (src && alt) {
    return (
      <div className="relative h-80">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    )
  }

  return null
}

export default function PostContent({ contentMarkdown }: PostContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: MarkdownHeading,
        h2: MarkdownHeading,
        h3: MarkdownHeading,
        h4: MarkdownHeading,
        h5: MarkdownHeading,
        h6: MarkdownHeading,
        p: Paragraph,
        em: Em,
        ol: OrderedList,
        ul: UnorderedList,
        li: ListItem,
        a: A,
        hr: Hr,
        pre: Pre,
        code: Code,
        img: Img,
      }}
      remarkPlugins={[remarkUnwrapImages]}
    >
      {contentMarkdown}
    </ReactMarkdown>
  )
}
