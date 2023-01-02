import Link from './link'

export default function Footer(): JSX.Element {
  return (
    <div className="border-t flex justify-center p-4">
      <Link href="https://gitlab.com/geext/denis-karpovskii-blog">
        Source code
      </Link>
    </div>
  )
}
