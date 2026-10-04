import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import type { PluggableList } from 'unified'

export const markdownComponents = {}

export const markdownPlugins = [
  remarkGfm,
  remarkMath,
]

export const rehypePlugins: PluggableList = [
  rehypeRaw,
  [rehypeHighlight, { plainText: ['mermaid'] }],
  rehypeKatex,
]

export { ReactMarkdown }
