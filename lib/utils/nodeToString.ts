import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export default function nodeToString(node: ReactNode): string | undefined {
  if (!node) {
    return undefined
  }

  if (
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean'
  ) {
    return node.toString()
  } else if (Array.isArray(node)) {
    return nodeToString(node[0])
  } else if (Symbol.iterator in node) {
    // noinspection LoopStatementThatDoesntLoopJS
    for (const val in node) {
      return val
    }
    return ''
  } else {
    return renderToStaticMarkup(node)
  }
}
