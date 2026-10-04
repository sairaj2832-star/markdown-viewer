import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import type { PluggableList } from 'unified'

export const markdownComponents = {}

export const markdownPlugins = [
  remarkGfm,
  remarkMath,
]

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'iframe', 'style'],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'style', 'className'],
    iframe: [
      'src',
      'width',
      'height',
      'target',
      'allow',
      'allowfullscreen',
      'frameborder',
    ],
  },
}

// sanitize must run after rehypeRaw (which parses raw HTML into nodes) and
// before rehypeHighlight/rehypeKatex, whose generated markup is trusted.
export const rehypePlugins: PluggableList = [
  rehypeRaw,
  [rehypeSanitize, sanitizeSchema],
  [rehypeHighlight, { plainText: ['mermaid'] }],
  rehypeKatex,
]

export { ReactMarkdown }
