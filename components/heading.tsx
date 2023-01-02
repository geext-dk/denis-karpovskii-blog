export interface HeadingProps {
  level: number
}

export default function Heading({
  level,
  className,
  ...props
}: HeadingProps & JSX.IntrinsicElements['h1']): JSX.Element {
  return (
    <DefaultHeading
      className={`font-bold ${className}`}
      level={level}
      {...props}
    />
  )
}

const DefaultHeading = ({
  level,
  className,
  ...props
}: HeadingProps & JSX.IntrinsicElements['h1']) => {
  const typedLevel = Math.max(Math.min(level, 6), 1) as 1 | 2 | 3 | 4 | 5 | 6
  switch (typedLevel) {
    case 1:
      return <h1 className={`text-5xl ${className}`} {...props} />
    case 2:
      return <h2 className={`text-4xl ${className}`} {...props} />
    case 3:
      return <h3 className={`text-3xl ${className}`} {...props} />
    case 4:
      return <h4 className={`text-2xl ${className}`} {...props} />
    case 5:
      return <h5 className={`text-xl ${className}`} {...props} />
    case 6:
      return <h6 className={`text-lg ${className}`} {...props} />
  }
}
