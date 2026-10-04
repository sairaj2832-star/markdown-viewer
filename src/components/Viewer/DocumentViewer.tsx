import { MarkdownRenderer } from './MarkdownRenderer'
import { TextRenderer } from './TextRenderer'
import { ErrorBoundary } from './ErrorBoundary'
import type { Document } from '../../types'

interface DocumentViewerProps {
  document: Document
  fontSize: number
  readingWidth: number
  resolvedTheme: 'light' | 'dark'
}

export function DocumentViewer({ document, fontSize, readingWidth, resolvedTheme }: DocumentViewerProps) {
  return (
    <ErrorBoundary>
      {document.fileType === 'text' ? (
        <TextRenderer
          content={document.content}
          fontSize={fontSize}
          readingWidth={readingWidth}
        />
      ) : (
        <article
          className="mx-auto px-5 sm:px-8 py-8 sm:py-12"
          style={{
            fontSize: `${fontSize}px`,
            maxWidth: `${readingWidth}px`,
          }}
        >
          <MarkdownRenderer content={document.content} resolvedTheme={resolvedTheme} />
        </article>
      )}
    </ErrorBoundary>
  )
}
