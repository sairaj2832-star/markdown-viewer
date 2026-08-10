import 'katex/dist/katex.min.css'
import katex from 'katex'

interface MathBlockProps {
  children: string
  display?: boolean
}

export function MathBlock({ children, display }: MathBlockProps) {
  let html = ''
  try {
    html = katex.renderToString(children, {
      throwOnError: false,
      displayMode: display,
    })
  } catch {
    html = children
  }

  return (
    <span
      className={display ? 'block text-center my-4' : 'inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
