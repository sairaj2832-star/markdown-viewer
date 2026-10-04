# Markdown Viewer

A browser-based Markdown reading environment with ChatGPT-quality rendering, multi-file tabs, and calm, polished UX.

## Features

- **Beautiful Markdown Rendering** — ChatGPT-inspired typography and layout
- **Multi-File Tabs** — Open multiple Markdown files as browser-style tabs
- **Drag & Drop** — Drop `.md` files anywhere to open them
- **Syntax Highlighting** — Code blocks with language detection and copy button
- **Math Rendering** — LaTeX/KaTeX support for mathematical notation
- **Diagram Rendering** — Mermaid diagrams with zoom, pan, and full-screen view
- **Dark/Light Mode** — Theme toggle with system preference detection
- **Responsive Design** — Works on desktop, tablet, and mobile
- **GFM Support** — Tables, task lists, strikethrough, and more
- **Privacy First** — All processing happens in the browser, no server required

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-markdown
- remark-gfm
- rehype-highlight
- rehype-katex
- highlight.js
- KaTeX
- DOMPurify
- lucide-react

## Usage

1. Open the application in your browser
2. Drag and drop `.md` files or click "Choose Files"
3. Each file opens in a new tab
4. Switch between tabs to read different documents
5. Toggle dark/light mode with the theme button

## License

MIT
