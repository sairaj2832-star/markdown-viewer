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
    <div className="relative group my-4 rounded-lg overflow-hidden border border-[var(--color-border)]">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <span className="text-xs font-medium text-[var(--color-text-muted)]">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className={`p-3 sm:p-4 overflow-x-auto bg-[var(--color-code-bg)] ${className || ''}`}>
        <code className={`language-${language || 'plaintext'}`}>{children}</code>
      </pre>
    </div>
  )
}
