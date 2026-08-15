interface TextRendererProps {
  content: string
  fontSize: number
  readingWidth: number
}

export function TextRenderer({ content, fontSize, readingWidth }: TextRendererProps) {
  return (
    <article
      className="mx-auto px-5 sm:px-8 py-8 sm:py-12"
      style={{
        fontSize: `${fontSize}px`,
        maxWidth: `${readingWidth}px`,
      }}
    >
      <pre
        className="whitespace-pre-wrap break-words text-[var(--color-text-primary)]"
        style={{
          fontFamily: 'var(--font-mono, "JetBrains Mono", "Fira Code", monospace)',
          lineHeight: 'var(--line-height-body, 1.75)',
          letterSpacing: 'var(--letter-spacing-body, 0)',
        }}
      >
        {content}
      </pre>
    </article>
  )
}