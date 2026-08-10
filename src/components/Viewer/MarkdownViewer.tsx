import { MarkdownRenderer } from './MarkdownRenderer'
import { ErrorBoundary } from './ErrorBoundary'
import type { Document } from '../../types'

interface MarkdownViewerProps {
  document: Document
  fontSize: number
  readingWidth: number
}

export function MarkdownViewer({ document, fontSize, readingWidth }: MarkdownViewerProps) {
  return (
    <article
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      style={{
        fontSize: `${fontSize}px`,
        maxWidth: `${readingWidth}px`,
      }}
    >
      <ErrorBoundary>
        <MarkdownRenderer content={document.content} />
      </ErrorBoundary>
    </article>
  )
}
