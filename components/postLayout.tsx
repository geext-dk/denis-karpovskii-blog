import { ReactNode } from 'react'

export interface PostLayoutProps {
  children: ReactNode
}

export default function PostLayout({ children }: PostLayoutProps): JSX.Element {
  return <>{children}</>
}
