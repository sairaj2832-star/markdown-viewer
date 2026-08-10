import { ReactMarkdown, markdownPlugins, rehypePlugins } from '../../lib/markdown'
import { CodeBlock } from './CodeBlock'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={markdownPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          const isBlock = String(children).includes('\n')

          if (isBlock) {
            return (
              <CodeBlock className={className} data-language={match?.[1]}>
                {children}
              </CodeBlock>
            )
          }

          return (
            <code className="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)] text-[var(--color-code-text)] text-[0.9em]" {...props}>
              {children}
            </code>
          )
        },
        pre({ children }) {
          return <>{children}</>
        },
        a({ href, children, ...props }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
              {...props}
            >
              {children}
            </a>
          )
        },
        table({ children, ...props }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse" {...props}>
                {children}
              </table>
            </div>
          )
        },
        thead({ children, ...props }) {
          return (
            <thead className="bg-[var(--color-table-header-bg)]" {...props}>
              {children}
            </thead>
          )
        },
        th({ children, ...props }) {
          return (
            <th className="px-4 py-2 text-left font-semibold border-b border-[var(--color-table-border)]" {...props}>
              {children}
            </th>
          )
        },
        td({ children, ...props }) {
          return (
            <td className="px-4 py-2 border-b border-[var(--color-table-border)]" {...props}>
              {children}
            </td>
          )
        },
        blockquote({ children, ...props }) {
          return (
            <blockquote
              className="pl-4 border-l-4 border-[var(--color-blockquote-border)] bg-[var(--color-blockquote-bg)] py-2 my-4 italic"
              {...props}
            >
              {children}
            </blockquote>
          )
        },
        img({ src, alt, ...props }) {
          return (
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full h-auto rounded-lg my-4"
              loading="lazy"
              {...props}
            />
          )
        },
        h1({ children, ...props }) {
          return (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-[var(--color-text-primary)]" {...props}>
              {children}
            </h1>
          )
        },
        h2({ children, ...props }) {
          return (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-[var(--color-text-primary)]" {...props}>
              {children}
            </h2>
          )
        },
        h3({ children, ...props }) {
          return (
            <h3 className="text-xl font-semibold mt-5 mb-2 text-[var(--color-text-primary)]" {...props}>
              {children}
            </h3>
          )
        },
        p({ children, ...props }) {
          return (
            <p className="leading-7 my-4 text-[var(--color-text-primary)]" {...props}>
              {children}
            </p>
          )
        },
        ul({ children, ...props }) {
          return (
            <ul className="list-disc pl-6 my-4 space-y-1" {...props}>
              {children}
            </ul>
          )
        },
        ol({ children, ...props }) {
          return (
            <ol className="list-decimal pl-6 my-4 space-y-1" {...props}>
              {children}
            </ol>
          )
        },
        li({ children, ...props }) {
          return (
            <li className="text-[var(--color-text-primary)]" {...props}>
              {children}
            </li>
          )
        },
        hr({ ...props }) {
          return (
            <hr className="my-8 border-t border-[var(--color-border)]" {...props} />
          )
        },
        input({ checked, ...props }) {
          return (
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mr-2 rounded border-[var(--color-border)]"
              {...props}
            />
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
