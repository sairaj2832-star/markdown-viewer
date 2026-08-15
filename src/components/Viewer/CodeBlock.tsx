import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  'data-language'?: string
}

export function CodeBlock({ children, className, 'data-language': language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = typeof children === 'string' ? children : ''
    if (text) {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="relative group my-6 overflow-hidden border border-[var(--color-border)]"
      style={{ borderRadius: 'var(--radius-card, 8px)' }}
    >
      {/* Code header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <span
          className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
        >
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors px-2 py-1 rounded-md hover:bg-[var(--color-bg-secondary)]"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
              <span className="hidden sm:inline text-[var(--color-success)]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre
        className={`p-4 overflow-x-auto bg-[var(--color-code-bg)] text-[var(--color-code-text)] text-[0.875em] leading-relaxed ${className || ''}`}
        style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", "Fira Code", monospace)' }}
      >
        <code className={`language-${language || 'plaintext'}`}>{children}</code>
      </pre>
    </div>
  )
}
