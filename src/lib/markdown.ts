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

// Nested browsing contexts are deliberately absent: a document could embed an arbitrary
// unsandboxed full-viewport frame, and protocols cannot express a host allowlist.
const sanitizeSchema = {
  ...defaultSchema,
  strip: [...(defaultSchema.strip ?? []), 'style'],
  // Base64 inline images are near universal in markdown exported from Notion,
  // Obsidian and AI tools. data: cannot script inside <img> in any current browser.
  protocols: { ...defaultSchema.protocols, src: ['http', 'https', 'data'] },
  attributes: {
    ...defaultSchema.attributes,
    code: [['className', /^language-[\w+#.+-]+$/]],
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
