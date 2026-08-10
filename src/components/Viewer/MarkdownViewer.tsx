import { MarkdownRenderer } from './MarkdownRenderer'
import type { Document } from '../../types'

interface MarkdownViewerProps {
  document: Document
}

export function MarkdownViewer({ document }: MarkdownViewerProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <MarkdownRenderer content={document.content} />
    </article>
  )
}
