interface TextRendererProps {
  content: string
  fontSize: number
  readingWidth: number
}

export function TextRenderer({ content, fontSize, readingWidth }: TextRendererProps) {
  return (
    <article
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      style={{
        fontSize: `${fontSize}px`,
        maxWidth: `${readingWidth}px`,
      }}
    >
      <pre
        className="whitespace-pre-wrap break-words font-mono text-[var(--color-text-primary)] leading-7"
      >
        {content}
      </pre>
    </article>
  )
}