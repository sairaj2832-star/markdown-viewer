import { ReactMarkdown, markdownPlugins, rehypePlugins } from '../../lib/markdown'
import { CodeBlock } from './CodeBlock'
import { MermaidDiagram } from '../Mermaid/MermaidDiagram'

interface MarkdownRendererProps {
  content: string
  resolvedTheme: 'light' | 'dark'
}

export function MarkdownRenderer({ content, resolvedTheme }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={markdownPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '')

            if (match?.[1] === 'mermaid') {
              return <MermaidDiagram code={String(children).trim()} resolvedTheme={resolvedTheme} />
            }

            const isBlock = String(children).includes('\n')

            if (isBlock) {
              return (
                <CodeBlock className={className} data-language={match?.[1]}>
                  {children}
                </CodeBlock>
              )
            }

            return (
              <code className="inline-code">
                {children}
              </code>
            )
          },
          pre({ children }) {
            return <>{children}</>
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="md-link"
              >
                {children}
              </a>
            )
          },
          table({ children, ...props }) {
            return (
              <div className="table-wrapper">
                <table {...props}>
                  {children}
                </table>
              </div>
            )
          },
          thead({ children, ...props }) {
            return (
              <thead {...props}>
                {children}
              </thead>
            )
          },
          th({ children, ...props }) {
            return (
              <th {...props}>
                {children}
              </th>
            )
          },
          td({ children, ...props }) {
            return (
              <td {...props}>
                {children}
              </td>
            )
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote className="md-blockquote" {...props}>
                {children}
              </blockquote>
            )
          },
          img({ src, alt, ...props }) {
            return (
              <figure className="md-figure">
                <img
                  src={src}
                  alt={alt || ''}
                  loading="lazy"
                  {...props}
                />
                {alt && <figcaption>{alt}</figcaption>}
              </figure>
            )
          },
          h1({ children, ...props }) {
            return (
              <h1
                className="md-h1"
                {...props}
              >
                {children}
              </h1>
            )
          },
          h2({ children, ...props }) {
            return (
              <h2 className="md-h2" {...props}>
                {children}
              </h2>
            )
          },
          h3({ children, ...props }) {
            return (
              <h3 className="md-h3" {...props}>
                {children}
              </h3>
            )
          },
          h4({ children, ...props }) {
            return (
              <h4 className="md-h4" {...props}>
                {children}
              </h4>
            )
          },
          p({ children, ...props }) {
            return (
              <p className="md-p" {...props}>
                {children}
              </p>
            )
          },
          ul({ children, ...props }) {
            return (
              <ul className="md-ul" {...props}>
                {children}
              </ul>
            )
          },
          ol({ children, ...props }) {
            return (
              <ol className="md-ol" {...props}>
                {children}
              </ol>
            )
          },
          li({ children, ...props }) {
            return (
              <li className="md-li" {...props}>
                {children}
              </li>
            )
          },
          hr({ ...props }) {
            return (
              <hr className="md-hr" {...props} />
            )
          },
          input({ checked, ...props }) {
            return (
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="md-checkbox"
                {...props}
              />
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
