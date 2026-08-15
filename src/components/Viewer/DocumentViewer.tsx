import { MarkdownRenderer } from './MarkdownRenderer'
import { TextRenderer } from './TextRenderer'
import { ErrorBoundary } from './ErrorBoundary'
import type { Document } from '../../types'

interface DocumentViewerProps {
  document: Document
  fontSize: number
  readingWidth: number
}

export function DocumentViewer({ document, fontSize, readingWidth }: DocumentViewerProps) {
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
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          style={{
            fontSize: `${fontSize}px`,
            maxWidth: `${readingWidth}px`,
          }}
        >
          <MarkdownRenderer content={document.content} />
        </article>
      )}
    </ErrorBoundary>
  )
}
