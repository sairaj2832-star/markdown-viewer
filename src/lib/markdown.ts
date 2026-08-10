import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'

export const markdownComponents = {}

export const markdownPlugins = [
  remarkGfm,
  remarkMath,
]

export const rehypePlugins = [
  rehypeRaw,
  rehypeHighlight,
  rehypeKatex,
]

export { ReactMarkdown }
