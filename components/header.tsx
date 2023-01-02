import Link from './link'

export default function Header(): JSX.Element {
  return (
    <div className="flex justify-center px-8 py-4">
      <nav className="flex justify-between items-center w-full md:w-10/12">
        <div>
          <Link className="text-xl md:text-2xl" href="/">
            Denis Karpovskii
          </Link>
        </div>
      </nav>
    </div>
  )
}
