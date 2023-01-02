import NextLink from 'next/link'

export default function Link({
  className,
  ...props
}: Parameters<typeof NextLink>[0]): JSX.Element {
  return <NextLink className={`hover:underline ${className}`} {...props} />
}
