# Markdown Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-based Markdown Reading Environment with ChatGPT-quality rendering, multi-file tabs, and calm, polished UX.

**Architecture:** React + TypeScript + Vite SPA with component-based architecture. File management, document state, Markdown parsing, and rendering are separated concerns. All processing happens in the browser—no backend required.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, react-markdown, remark-gfm, rehype-highlight, rehype-katex, remark-math, DOMPurify, highlight.js, KaTeX, lucide-react

## Global Constraints

- No backend, authentication, or database
- No editor UI or split-pane preview
- All Markdown processing in browser
- Files stay in browser (privacy principle)
- Deployable as static web app
- React + TypeScript + Vite + Tailwind CSS stack
- Dark/light theme with design tokens
- Responsive desktop/mobile layout
- Browser-like multi-file tabs

---

## File Structure

```
markdown-viewer/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useDocuments.ts
│   │   ├── useTheme.ts
│   │   └── useFileUpload.ts
│   ├── store/
│   │   └── documentStore.ts
│   ├── lib/
│   │   ├── markdown.ts
│   │   ├── sanitize.ts
│   │   └── fileUtils.ts
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ReadingContainer.tsx
│   │   ├── Tabs/
│   │   │   ├── TabBar.tsx
│   │   │   └── Tab.tsx
│   │   ├── Viewer/
│   │   │   ├── MarkdownViewer.tsx
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── MathBlock.tsx
│   │   ├── Upload/
│   │   │   ├── EmptyState.tsx
│   │   │   ├── DropZone.tsx
│   │   │   └── FileUploadButton.tsx
│   │   └── Theme/
│   │       └── ThemeToggle.tsx
│   └── styles/
│       └── themes.css
├── public/
│   └── favicon.svg
└── docs/
    └── superpowers/
        └── plans/
            └── 2026-08-10-markdown-viewer.md
```

**Responsibilities:**
- `types/index.ts` — Document, Theme, Tab interfaces
- `store/documentStore.ts` — Central state for documents and active tab
- `hooks/` — React hooks for documents, theme, file upload
- `lib/markdown.ts` — Markdown parsing pipeline (unified/remark/rehype)
- `lib/sanitize.ts` — DOMPurify HTML sanitization
- `lib/fileUtils.ts` — File reading and validation utilities
- `components/Layout/` — App shell, header, reading container
- `components/Tabs/` — Tab bar and individual tabs
- `components/Viewer/` — Markdown rendering components
- `components/Upload/` — Empty state, drop zone, file picker
- `components/Theme/` — Theme toggle button

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/vite-env.d.ts`

**Interfaces:**
- Consumes: None (first task)
- Produces: Vite dev server running on localhost:5173

- [ ] **Step 1: Initialize npm project and install dependencies**

```bash
npm init -y
npm install react@18 react-dom@18
npm install -D typescript @types/react @types/react-dom vite @vitejs/plugin-react tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 5: Configure Tailwind CSS in tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 6: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Markdown Viewer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 8: Create src/index.css with Tailwind directives**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

- [ ] **Step 9: Create src/main.tsx**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 10: Create src/App.tsx placeholder**

```typescript
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold p-4">Markdown Viewer</h1>
    </div>
  )
}

export default App
```

- [ ] **Step 11: Run dev server and verify**

```bash
npm run dev
```

Expected: Browser shows "Markdown Viewer" heading on white background.

- [ ] **Step 12: Commit scaffolding**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind project"
```

---

## Task 2: Design Tokens and Theme System

**Files:**
- Create: `src/styles/themes.css`
- Create: `src/types/index.ts`
- Create: `src/hooks/useTheme.ts`
- Create: `src/components/Theme/ThemeToggle.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Task 1 (Vite project)
- Produces: `useTheme()` hook, `ThemeToggle` component, CSS custom properties for light/dark themes

- [ ] **Step 1: Define types in src/types/index.ts**

```typescript
export type Theme = 'light' | 'dark' | 'system'

export interface Document {
  id: string
  name: string
  content: string
  size: number
  type: string
}

export interface DocumentState {
  documents: Document[]
  activeDocumentId: string | null
}
```

- [ ] **Step 2: Create src/styles/themes.css with design tokens**

```css
:root {
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-elevated: #ffffff;
  --color-surface: #f3f4f6;
  --color-border: #e5e7eb;
  --color-border-strong: #d1d5db;
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-muted: #9ca3af;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
  --color-code-bg: #f3f4f6;
  --color-code-text: #1f2937;
  --color-blockquote-border: #d1d5db;
  --color-blockquote-bg: #f9fafb;
  --color-table-header-bg: #f3f4f6;
  --color-table-border: #e5e7eb;
  --color-selection: #bfdbfe;
  --color-focus-ring: #3b82f6;
  --color-success: #10b981;
  --color-error: #ef4444;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}

.dark {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-elevated: #1e293b;
  --color-surface: #334155;
  --color-border: #334155;
  --color-border-strong: #475569;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #64748b;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-code-bg: #1e293b;
  --color-code-text: #e2e8f0;
  --color-blockquote-border: #475569;
  --color-blockquote-bg: #1e293b;
  --color-table-header-bg: #1e293b;
  --color-table-border: #334155;
  --color-selection: #1e3a5f;
  --color-focus-ring: #60a5fa;
  --color-success: #34d399;
  --color-error: #f87171;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
}
```

- [ ] **Step 3: Import themes.css in src/index.css**

```css
@import './styles/themes.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

- [ ] **Step 4: Create src/hooks/useTheme.ts**

```typescript
import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '../types'

const STORAGE_KEY = 'markdown-viewer-theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

function getStoredTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  }
  return 'system'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    return theme === 'system' ? getSystemTheme() : theme
  })

  const applyTheme = useCallback((t: 'light' | 'dark') => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(t)
    setResolvedTheme(t)
  }, [])

  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme
    applyTheme(resolved)
  }, [theme, applyTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      applyTheme(getSystemTheme())
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }, [])

  return { theme, resolvedTheme, setTheme }
}
```

- [ ] **Step 5: Create src/components/Theme/ThemeToggle.tsx**

```typescript
import { Sun, Moon, Monitor } from 'lucide-react'
import type { Theme } from '../../types'

interface ThemeToggleProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const cycleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    onThemeChange(next)
  }

  const icon = theme === 'light' ? (
    <Sun className="w-5 h-5" />
  ) : theme === 'dark' ? (
    <Moon className="w-5 h-5" />
  ) : (
    <Monitor className="w-5 h-5" />
  )

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      {icon}
    </button>
  )
}
```

- [ ] **Step 6: Update src/App.tsx to use theme**

```typescript
import { useTheme } from './hooks/useTheme'
import { ThemeToggle } from './components/Theme/ThemeToggle'

function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <header className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <h1 className="text-lg font-semibold">Markdown Viewer</h1>
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
      </header>
    </div>
  )
}

export default App
```

- [ ] **Step 7: Run dev server and verify theme toggle**

```bash
npm run dev
```

Expected: Clicking theme icon cycles through sun (light), moon (dark), monitor (system). Background and text colors change. Preference persists in localStorage.

- [ ] **Step 8: Commit theme system**

```bash
git add .
git commit -m "feat: add design tokens and theme toggle with light/dark/system modes"
```

---

## Task 3: Document State Management

**Files:**
- Create: `src/store/documentStore.ts`
- Modify: `src/hooks/useDocuments.ts`

**Interfaces:**
- Consumes: Task 2 (`Document` type from `types/index.ts`)
- Produces: `useDocuments()` hook with `addDocument`, `removeDocument`, `setActiveDocument`, `documents`, `activeDocument`

- [ ] **Step 1: Create src/store/documentStore.ts**

```typescript
import type { Document, DocumentState } from '../types'

type Listener = () => void

let state: DocumentState = {
  documents: [],
  activeDocumentId: null,
}

const listeners = new Set<Listener>()

function emitChange() {
  listeners.forEach(listener => listener())
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export const documentStore = {
  getState(): DocumentState {
    return state
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  addDocument(file: File, content: string): string {
    const id = generateId()
    const doc: Document = {
      id,
      name: file.name,
      content,
      size: file.size,
      type: file.type || 'text/markdown',
    }
    state = {
      documents: [...state.documents, doc],
      activeDocumentId: id,
    }
    emitChange()
    return id
  },

  addDocuments(files: { file: File; content: string }[]): string[] {
    const ids: string[] = []
    const newDocs: Document[] = files.map(({ file, content }) => {
      const id = generateId()
      ids.push(id)
      return {
        id,
        name: file.name,
        content,
        size: file.size,
        type: file.type || 'text/markdown',
      }
    })
    state = {
      documents: [...state.documents, ...newDocs],
      activeDocumentId: ids[ids.length - 1] || state.activeDocumentId,
    }
    emitChange()
    return ids
  },

  removeDocument(id: string): void {
    const docIndex = state.documents.findIndex(d => d.id === id)
    if (docIndex === -1) return

    const newDocuments = state.documents.filter(d => d.id !== id)
    let newActiveId = state.activeDocumentId

    if (state.activeDocumentId === id) {
      if (newDocuments.length === 0) {
        newActiveId = null
      } else {
        const nextIndex = Math.min(docIndex, newDocuments.length - 1)
        newActiveId = newDocuments[nextIndex].id
      }
    }

    state = {
      documents: newDocuments,
      activeDocumentId: newActiveId,
    }
    emitChange()
  },

  setActiveDocument(id: string): void {
    if (state.documents.some(d => d.id === id)) {
      state = { ...state, activeDocumentId: id }
      emitChange()
    }
  },
}
```

- [ ] **Step 2: Create src/hooks/useDocuments.ts**

```typescript
import { useSyncExternalStore, useCallback } from 'react'
import { documentStore } from '../store/documentStore'

export function useDocuments() {
  const documents = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.getState().documents,
    () => documentStore.getState().documents
  )

  const activeDocumentId = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.getState().activeDocumentId,
    () => documentStore.getState().activeDocumentId
  )

  const activeDocument = documents.find(d => d.id === activeDocumentId) || null

  const addDocument = useCallback((file: File, content: string) => {
    return documentStore.addDocument(file, content)
  }, [])

  const addDocuments = useCallback((files: { file: File; content: string }[]) => {
    return documentStore.addDocuments(files)
  }, [])

  const removeDocument = useCallback((id: string) => {
    documentStore.removeDocument(id)
  }, [])

  const setActiveDocument = useCallback((id: string) => {
    documentStore.setActiveDocument(id)
  }, [])

  return {
    documents,
    activeDocument,
    activeDocumentId,
    addDocument,
    addDocuments,
    removeDocument,
    setActiveDocument,
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit document state**

```bash
git add .
git commit -m "feat: add document state management with add/remove/activate"
```

---

## Task 4: File Upload Utilities

**Files:**
- Create: `src/lib/fileUtils.ts`
- Create: `src/hooks/useFileUpload.ts`

**Interfaces:**
- Consumes: Task 3 (`addDocuments` from `useDocuments`)
- Produces: `readMarkdownFiles(files: FileList)`, `useFileUpload()` hook

- [ ] **Step 1: Create src/lib/fileUtils.ts**

```typescript
const ACCEPTED_EXTENSIONS = ['.md', '.markdown', '.mdown', '.mkd']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function isMarkdownFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some(ext => name.endsWith(ext)) ||
    file.type === 'text/markdown' ||
    file.type === 'text/x-markdown'
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!isMarkdownFile(file)) {
    return { valid: false, error: `Unsupported file type: ${file.name}` }
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File too large: ${file.name} (max 10MB)` }
  }
  return { valid: true }
}

export async function readMarkdownFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`))
    reader.readAsText(file)
  })
}

export async function readMarkdownFiles(
  files: FileList | File[]
): Promise<{ file: File; content: string; error?: string }[]> {
  const results = await Promise.all(
    Array.from(files).map(async (file) => {
      const validation = validateFile(file)
      if (!validation.valid) {
        return { file, content: '', error: validation.error }
      }
      try {
        const content = await readMarkdownFile(file)
        return { file, content }
      } catch (err) {
        return { file, content: '', error: `Failed to read ${file.name}` }
      }
    })
  )
  return results
}
```

- [ ] **Step 2: Create src/hooks/useFileUpload.ts**

```typescript
import { useCallback, useState } from 'react'
import { readMarkdownFiles } from '../lib/fileUtils'
import { useDocuments } from './useDocuments'

export function useFileUpload() {
  const { addDocuments } = useDocuments()
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setErrors([])
    const results = await readMarkdownFiles(files)
    const successful = results.filter(r => !r.error && r.content)
    const failed = results.filter(r => r.error)

    if (failed.length > 0) {
      setErrors(failed.map(r => r.error!))
    }

    if (successful.length > 0) {
      addDocuments(successful.map(r => ({ file: r.file, content: r.content })))
    }
  }, [addDocuments])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }, [processFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
      e.target.value = ''
    }
  }, [processFiles])

  return {
    isDragging,
    errors,
    processFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit file upload utilities**

```bash
git add .
git commit -m "feat: add file reading, validation, and upload hook"
```

---

## Task 5: Empty State and Drop Zone

**Files:**
- Create: `src/components/Upload/EmptyState.tsx`
- Create: `src/components/Upload/DropZone.tsx`
- Create: `src/components/Upload/FileUploadButton.tsx`

**Interfaces:**
- Consumes: Task 4 (`useFileUpload` hook)
- Produces: `EmptyState` component, `DropZone` wrapper component, `FileUploadButton` component

- [ ] **Step 1: Create src/components/Upload/FileUploadButton.tsx**

```typescript
import { useRef } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadButtonProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FileUploadButton({ onFileSelect }: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".md,.markdown,.mdown,.mkd,text/markdown,text/x-markdown"
        multiple
        onChange={onFileSelect}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors font-medium"
      >
        <Upload className="w-4 h-4" />
        Choose Files
      </button>
    </>
  )
}
```

- [ ] **Step 2: Create src/components/Upload/EmptyState.tsx**

```typescript
import { FileText } from 'lucide-react'
import { FileUploadButton } from './FileUploadButton'

interface EmptyStateProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function EmptyState({ onFileSelect }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="mb-6 p-4 rounded-full bg-[var(--color-surface)]">
        <FileText className="w-12 h-12 text-[var(--color-text-muted)]" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
        Markdown Viewer
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
        Your documents, beautifully rendered. Drop Markdown files here or click to browse.
      </p>
      <FileUploadButton onFileSelect={onFileSelect} />
    </div>
  )
}
```

- [ ] **Step 3: Create src/components/Upload/DropZone.tsx**

```typescript
import { FileUploadButton } from './FileUploadButton'

interface DropZoneProps {
  isDragging: boolean
  onDragEnter: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}

export function DropZone({
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileSelect,
  children,
}: DropZoneProps) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="relative min-h-screen"
    >
      {children}
      {isDragging && (
        <div className="absolute inset-0 bg-[var(--color-accent)]/10 border-2 border-dashed border-[var(--color-accent)] rounded-lg z-50 flex items-center justify-center">
          <div className="text-center">
            <FileUploadButton onFileSelect={onFileSelect} />
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Drop Markdown files here
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit upload components**

```bash
git add .
git commit -m "feat: add empty state, drop zone, and file upload button"
```

---

## Task 6: Tab System

**Files:**
- Create: `src/components/Tabs/Tab.tsx`
- Create: `src/components/Tabs/TabBar.tsx`

**Interfaces:**
- Consumes: Task 3 (`useDocuments` hook with `documents`, `activeDocumentId`, `setActiveDocument`, `removeDocument`)
- Produces: `TabBar` component with `Tab` children

- [ ] **Step 1: Create src/components/Tabs/Tab.tsx**

```typescript
import { X } from 'lucide-react'

interface TabProps {
  id: string
  name: string
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

export function Tab({ id, name, isActive, onSelect, onClose }: TabProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <button
      onClick={onSelect}
      className={`
        group flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg
        border-b-2 transition-colors min-w-0 max-w-[200px]
        ${isActive
          ? 'bg-[var(--color-bg)] border-[var(--color-accent)] text-[var(--color-text-primary)]'
          : 'bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
        }
      `}
      aria-selected={isActive}
      role="tab"
    >
      <span className="truncate">{name}</span>
      <span
        onClick={handleClose}
        className={`
          ml-1 p-0.5 rounded hover:bg-[var(--color-surface)] transition-colors
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
        aria-label={`Close ${name}`}
      >
        <X className="w-3.5 h-3.5" />
      </span>
    </button>
  )
}
```

- [ ] **Step 2: Create src/components/Tabs/TabBar.tsx**

```typescript
import { Tab } from './Tab'

interface TabBarProps {
  documents: { id: string; name: string }[]
  activeDocumentId: string | null
  onSelectDocument: (id: string) => void
  onCloseDocument: (id: string) => void
}

export function TabBar({
  documents,
  activeDocumentId,
  onSelectDocument,
  onCloseDocument,
}: TabBarProps) {
  if (documents.length === 0) return null

  return (
    <div
      className="flex items-end gap-1 px-2 pt-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] overflow-x-auto"
      role="tablist"
    >
      {documents.map(doc => (
        <Tab
          key={doc.id}
          id={doc.id}
          name={doc.name}
          isActive={doc.id === activeDocumentId}
          onSelect={() => onSelectDocument(doc.id)}
          onClose={() => onCloseDocument(doc.id)}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit tab system**

```bash
git add .
git commit -m "feat: add browser-like tab bar with tab switching and closing"
```

---

## Task 7: Markdown Parsing Pipeline

**Files:**
- Create: `src/lib/markdown.ts`
- Create: `src/lib/sanitize.ts`

**Interfaces:**
- Consumes: Task 1 (project setup)
- Produces: `parseMarkdown(content: string)`, `sanitizeHtml(html: string)`

- [ ] **Step 1: Install markdown and math dependencies**

```bash
npm install react-markdown remark-gfm rehype-highlight rehype-katex remark-math rehype-raw
npm install highlight.js
npm install katex
npm install dompurify
npm install -D @types/dompurify
```

- [ ] **Step 2: Create src/lib/sanitize.ts**

```typescript
import DOMPurify from 'dompurify'

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder'],
  })
}
```

- [ ] **Step 3: Create src/lib/markdown.ts**

```typescript
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit markdown pipeline**

```bash
git add .
git commit -m "feat: add markdown parsing pipeline with GFM, math, syntax highlighting"
```

---

## Task 8: Markdown Renderer Component

**Files:**
- Create: `src/components/Viewer/MarkdownRenderer.tsx`
- Create: `src/components/Viewer/CodeBlock.tsx`
- Create: `src/components/Viewer/MathBlock.tsx`
- Create: `src/components/Viewer/MarkdownViewer.tsx`

**Interfaces:**
- Consumes: Task 7 (`ReactMarkdown`, plugins, components), Task 3 (`Document` type)
- Produces: `MarkdownViewer` component that renders a single document

- [ ] **Step 1: Create src/components/Viewer/CodeBlock.tsx**

```typescript
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
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
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
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className={`p-4 overflow-x-auto bg-[var(--color-code-bg)] ${className || ''}`}>
        <code className={`language-${language || 'plaintext'}`}>{children}</code>
      </pre>
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/Viewer/MathBlock.tsx**

```typescript
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
```

- [ ] **Step 3: Create src/components/Viewer/MarkdownRenderer.tsx**

```typescript
import { ReactMarkdown, markdownPlugins, rehypePlugins } from '../../lib/markdown'
import { CodeBlock } from './CodeBlock'
import { MathBlock } from './MathBlock'

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
```

- [ ] **Step 4: Create src/components/Viewer/MarkdownViewer.tsx**

```typescript
import { MarkdownRenderer } from './MarkdownRenderer'
import type { Document } from '../../types'

interface MarkdownViewerProps {
  document: Document
}

export function MarkdownViewer({ document }: MarkdownViewerProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MarkdownRenderer content={document.content} />
    </article>
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit markdown rendering**

```bash
git add .
git commit -m "feat: add markdown renderer with code blocks, math, tables, and typography"
```

---

## Task 9: App Shell and Layout

**Files:**
- Create: `src/components/Layout/AppShell.tsx`
- Create: `src/components/Layout/Header.tsx`
- Create: `src/components/Layout/ReadingContainer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: Task 2 (theme), Task 3 (documents), Task 4 (file upload), Task 5 (empty state, drop zone), Task 6 (tab bar), Task 8 (markdown viewer)
- Produces: Complete application layout

- [ ] **Step 1: Create src/components/Layout/Header.tsx**

```typescript
import { ThemeToggle } from '../Theme/ThemeToggle'
import { FileUploadButton } from '../Upload/FileUploadButton'
import { FileText } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark' | 'system'
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ theme, onThemeChange, onFileSelect }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-[var(--color-accent)]" />
        <span className="font-semibold text-[var(--color-text-primary)]">Markdown Viewer</span>
      </div>
      <div className="flex items-center gap-2">
        <FileUploadButton onFileSelect={onFileSelect} />
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create src/components/Layout/ReadingContainer.tsx**

```typescript
interface ReadingContainerProps {
  children: React.ReactNode
}

export function ReadingContainer({ children }: ReadingContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
      {children}
    </main>
  )
}
```

- [ ] **Step 3: Create src/components/Layout/AppShell.tsx**

```typescript
interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Update src/App.tsx to compose all components**

```typescript
import { useTheme } from './hooks/useTheme'
import { useDocuments } from './hooks/useDocuments'
import { useFileUpload } from './hooks/useFileUpload'
import { AppShell } from './components/Layout/AppShell'
import { Header } from './components/Layout/Header'
import { ReadingContainer } from './components/Layout/ReadingContainer'
import { TabBar } from './components/Tabs/TabBar'
import { EmptyState } from './components/Upload/EmptyState'
import { DropZone } from './components/Upload/DropZone'
import { MarkdownViewer } from './components/Viewer/MarkdownViewer'

function App() {
  const { theme, setTheme } = useTheme()
  const { documents, activeDocument, activeDocumentId, setActiveDocument, removeDocument } = useDocuments()
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
  } = useFileUpload()

  return (
    <AppShell>
      <DropZone
        isDragging={isDragging}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onFileSelect={handleFileSelect}
      >
        <Header
          theme={theme}
          onThemeChange={setTheme}
          onFileSelect={handleFileSelect}
        />
        <TabBar
          documents={documents}
          activeDocumentId={activeDocumentId}
          onSelectDocument={setActiveDocument}
          onCloseDocument={removeDocument}
        />
        <ReadingContainer>
          {activeDocument ? (
            <MarkdownViewer document={activeDocument} />
          ) : (
            <EmptyState onFileSelect={handleFileSelect} />
          )}
        </ReadingContainer>
      </DropZone>
    </AppShell>
  )
}

export default App
```

- [ ] **Step 5: Run dev server and verify full app**

```bash
npm run dev
```

Expected: Empty state shows. Drop/select files creates tabs. Click tabs switches documents. Theme toggle works. Drag & drop shows overlay.

- [ ] **Step 6: Commit app shell**

```bash
git add .
git commit -m "feat: compose app shell with header, tabs, drop zone, and viewer"
```

---

## Task 10: Syntax Highlighting Styles

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Task 7 (highlight.js)
- Produces: Syntax highlighting styles for both themes

- [ ] **Step 1: Add highlight.js theme imports to src/index.css**

```css
@import './styles/themes.css';

/* Light theme syntax highlighting */
@import 'highlight.js/styles/github.css';

/* Dark theme syntax highlighting - applied via .dark class */
.dark {
  @import 'highlight.js/styles/github-dark.css';
}

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

- [ ] **Step 2: Verify highlight.js CSS imports work**

```bash
npm run dev
```

Expected: Code blocks show syntax highlighting in light mode.

- [ ] **Step 3: Commit syntax highlighting styles**

```bash
git add .
git commit -m "feat: add highlight.js theme styles for syntax highlighting"
```

---

## Task 11: Responsive Design and Polish

**Files:**
- Modify: `src/components/Layout/Header.tsx`
- Modify: `src/components/Tabs/TabBar.tsx`
- Modify: `src/components/Viewer/MarkdownViewer.tsx`
- Modify: `src/components/Viewer/CodeBlock.tsx`
- Modify: `src/styles/themes.css`

**Interfaces:**
- Consumes: All previous tasks
- Produces: Responsive layout, polished styling, smooth transitions

- [ ] **Step 1: Add responsive header styles**

Update `src/components/Layout/Header.tsx` to hide text on mobile:

```typescript
import { ThemeToggle } from '../Theme/ThemeToggle'
import { FileUploadButton } from '../Upload/FileUploadButton'
import { FileText } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark' | 'system'
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ theme, onThemeChange, onFileSelect }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-[var(--color-accent)]" />
        <span className="font-semibold text-[var(--color-text-primary)] hidden sm:inline">
          Markdown Viewer
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <FileUploadButton onFileSelect={onFileSelect} />
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Add tab bar horizontal scroll on mobile**

Update `src/components/Tabs/TabBar.tsx`:

```typescript
import { Tab } from './Tab'

interface TabBarProps {
  documents: { id: string; name: string }[]
  activeDocumentId: string | null
  onSelectDocument: (id: string) => void
  onCloseDocument: (id: string) => void
}

export function TabBar({
  documents,
  activeDocumentId,
  onSelectDocument,
  onCloseDocument,
}: TabBarProps) {
  if (documents.length === 0) return null

  return (
    <div
      className="flex items-end gap-1 px-2 pt-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] overflow-x-auto scrollbar-hide"
      role="tablist"
    >
      {documents.map(doc => (
        <Tab
          key={doc.id}
          id={doc.id}
          name={doc.name}
          isActive={doc.id === activeDocumentId}
          onSelect={() => onSelectDocument(doc.id)}
          onClose={() => onCloseDocument(doc.id)}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Add reading width and typography polish**

Update `src/components/Viewer/MarkdownViewer.tsx`:

```typescript
import { MarkdownRenderer } from './MarkdownRenderer'
import type { Document } from '../../types'

interface MarkdownViewerProps {
  document: Document
}

export function MarkdownViewer({ document }: MarkdownViewerProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <MarkdownRenderer content={document.content} />
    </article>
  )
}
```

- [ ] **Step 4: Add smooth code block styling**

Update `src/components/Viewer/CodeBlock.tsx` to improve mobile experience:

```typescript
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
```

- [ ] **Step 5: Add scrollbar-hide utility to src/index.css**

```css
@import './styles/themes.css';

/* Light theme syntax highlighting */
@import 'highlight.js/styles/github.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

- [ ] **Step 6: Verify responsive behavior**

```bash
npm run dev
```

Expected: Desktop shows full header. Mobile shows compact header. Tabs scroll horizontally on mobile. Code blocks scroll horizontally for long lines.

- [ ] **Step 7: Commit responsive polish**

```bash
git add .
git commit -m "feat: add responsive design and polish for mobile and desktop"
```

---

## Task 12: KaTeX CSS Integration

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Task 8 (MathBlock uses KaTeX)
- Produces: Proper KaTeX font loading

- [ ] **Step 1: Verify KaTeX CSS is imported in MathBlock**

The `src/components/Viewer/MathBlock.tsx` already imports `katex/dist/katex.min.css`. Verify it works.

- [ ] **Step 2: Add KaTeX fallback fonts to index.css**

```css
@import './styles/themes.css';
@import 'highlight.js/styles/github.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

- [ ] **Step 3: Verify KaTeX rendering**

```bash
npm run dev
```

Expected: Math expressions render with proper fonts and layout.

- [ ] **Step 4: Commit KaTeX integration**

```bash
git add .
git commit -m "feat: verify KaTeX math rendering and font loading"
```

---

## Task 13: Error Handling and Edge Cases

**Files:**
- Modify: `src/hooks/useFileUpload.ts`
- Modify: `src/components/Upload/EmptyState.tsx`
- Modify: `src/components/Viewer/MarkdownRenderer.tsx`

**Interfaces:**
- Consumes: All previous tasks
- Produces: Error display, empty state handling, malformed Markdown handling

- [ ] **Step 1: Add error display to EmptyState**

Update `src/components/Upload/EmptyState.tsx`:

```typescript
import { FileText, AlertCircle } from 'lucide-react'
import { FileUploadButton } from './FileUploadButton'

interface EmptyStateProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

export function EmptyState({ onFileSelect, errors }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="mb-6 p-4 rounded-full bg-[var(--color-surface)]">
        <FileText className="w-12 h-12 text-[var(--color-text-muted)]" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
        Markdown Viewer
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
        Your documents, beautifully rendered. Drop Markdown files here or click to browse.
      </p>
      <FileUploadButton onFileSelect={onFileSelect} />
      {errors && errors.length > 0 && (
        <div className="mt-6 p-3 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 max-w-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--color-error)] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-[var(--color-error)]">
              {errors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Update App.tsx to pass errors to EmptyState**

```typescript
import { useTheme } from './hooks/useTheme'
import { useDocuments } from './hooks/useDocuments'
import { useFileUpload } from './hooks/useFileUpload'
import { AppShell } from './components/Layout/AppShell'
import { Header } from './components/Layout/Header'
import { ReadingContainer } from './components/Layout/ReadingContainer'
import { TabBar } from './components/Tabs/TabBar'
import { EmptyState } from './components/Upload/EmptyState'
import { DropZone } from './components/Upload/DropZone'
import { MarkdownViewer } from './components/Viewer/MarkdownViewer'

function App() {
  const { theme, setTheme } = useTheme()
  const { documents, activeDocument, activeDocumentId, setActiveDocument, removeDocument } = useDocuments()
  const {
    isDragging,
    errors,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
  } = useFileUpload()

  return (
    <AppShell>
      <DropZone
        isDragging={isDragging}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onFileSelect={handleFileSelect}
      >
        <Header
          theme={theme}
          onThemeChange={setTheme}
          onFileSelect={handleFileSelect}
        />
        <TabBar
          documents={documents}
          activeDocumentId={activeDocumentId}
          onSelectDocument={setActiveDocument}
          onCloseDocument={removeDocument}
        />
        <ReadingContainer>
          {activeDocument ? (
            <MarkdownViewer document={activeDocument} />
          ) : (
            <EmptyState onFileSelect={handleFileSelect} errors={errors} />
          )}
        </ReadingContainer>
      </DropZone>
    </AppShell>
  )
}

export default App
```

- [ ] **Step 3: Add Markdown error boundary**

Create `src/components/Viewer/ErrorBoundary.tsx`:

```typescript
import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--color-error)] mt-0.5" />
            <div>
              <h3 className="font-medium text-[var(--color-error)]">
                Rendering Error
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {this.state.error?.message || 'Failed to render Markdown'}
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

- [ ] **Step 4: Wrap MarkdownRenderer with ErrorBoundary in MarkdownViewer**

Update `src/components/Viewer/MarkdownViewer.tsx`:

```typescript
import { MarkdownRenderer } from './MarkdownRenderer'
import { ErrorBoundary } from './ErrorBoundary'
import type { Document } from '../../types'

interface MarkdownViewerProps {
  document: Document
}

export function MarkdownViewer({ document }: MarkdownViewerProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <ErrorBoundary>
        <MarkdownRenderer content={document.content} />
      </ErrorBoundary>
    </article>
  )
}
```

- [ ] **Step 5: Verify error handling**

```bash
npm run dev
```

Expected: Malformed Markdown renders with fallback. Empty files show empty content. File errors display in empty state.

- [ ] **Step 6: Commit error handling**

```bash
git add .
git commit -m "feat: add error handling for file uploads and Markdown rendering"
```

---

## Task 14: Accessibility and Focus States

**Files:**
- Modify: `src/components/Tabs/Tab.tsx`
- Modify: `src/components/Theme/ThemeToggle.tsx`
- Modify: `src/components/Upload/FileUploadButton.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: All previous tasks
- Produces: Keyboard navigation, focus indicators, ARIA labels

- [ ] **Step 1: Add focus ring styles to index.css**

```css
@import './styles/themes.css';
@import 'highlight.js/styles/github.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

@layer base {
  :focus-visible {
    @apply outline-none ring-2 ring-[var(--color-focus-ring)] ring-offset-2 ring-offset-[var(--color-bg)];
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

- [ ] **Step 2: Add keyboard support to Tab component**

Update `src/components/Tabs/Tab.tsx`:

```typescript
import { X } from 'lucide-react'

interface TabProps {
  id: string
  name: string
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

export function Tab({ id, name, isActive, onSelect, onClose }: TabProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
    if (e.key === 'Delete') {
      onClose()
    }
  }

  return (
    <button
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`
        group flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg
        border-b-2 transition-colors min-w-0 max-w-[200px]
        ${isActive
          ? 'bg-[var(--color-bg)] border-[var(--color-accent)] text-[var(--color-text-primary)]'
          : 'bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
        }
      `}
      aria-selected={isActive}
      role="tab"
      tabIndex={isActive ? 0 : -1}
    >
      <span className="truncate">{name}</span>
      <span
        onClick={handleClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClose()
          }
        }}
        className={`
          ml-1 p-0.5 rounded hover:bg-[var(--color-surface)] transition-colors
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
        aria-label={`Close ${name}`}
        role="button"
        tabIndex={isActive ? 0 : -1}
      >
        <X className="w-3.5 h-3.5" />
      </span>
    </button>
  )
}
```

- [ ] **Step 3: Add ARIA labels to ThemeToggle**

Update `src/components/Theme/ThemeToggle.tsx`:

```typescript
import { Sun, Moon, Monitor } from 'lucide-react'
import type { Theme } from '../../types'

interface ThemeToggleProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const cycleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    onThemeChange(next)
  }

  const icon = theme === 'light' ? (
    <Sun className="w-5 h-5" />
  ) : theme === 'dark' ? (
    <Moon className="w-5 h-5" />
  ) : (
    <Monitor className="w-5 h-5" />
  )

  const label = `Current theme: ${theme}. Click to change to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'}.`

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
      aria-label={label}
    >
      {icon}
    </button>
  )
}
```

- [ ] **Step 4: Add skip link for keyboard users**

Create `src/components/Layout/SkipLink.tsx`:

```typescript
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
  )
}
```

- [ ] **Step 5: Add SkipLink to AppShell and id to ReadingContainer**

Update `src/components/Layout/AppShell.tsx`:

```typescript
import { SkipLink } from './SkipLink'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <SkipLink />
      {children}
    </div>
  )
}
```

Update `src/components/Layout/ReadingContainer.tsx`:

```typescript
interface ReadingContainerProps {
  children: React.ReactNode
}

export function ReadingContainer({ children }: ReadingContainerProps) {
  return (
    <main id="main-content" className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
      {children}
    </main>
  )
}
```

- [ ] **Step 6: Verify keyboard navigation**

```bash
npm run dev
```

Expected: Tab key focuses elements. Focus ring visible. Enter/Space activates buttons. Delete closes tabs. Skip link appears on first Tab press.

- [ ] **Step 7: Commit accessibility improvements**

```bash
git add .
git commit -m "feat: add keyboard navigation, focus states, and ARIA labels"
```

---

## Task 15: Production Build and Verification

**Files:**
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: All previous tasks
- Produces: Production build, verified deployment artifact

- [ ] **Step 1: Add build script to package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds. `dist/` folder created with HTML, JS, CSS.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Expected: Opens preview server. Application works identically to dev.

- [ ] **Step 4: Verify all features work in production**

Test checklist:
- [ ] File upload works
- [ ] Drag & drop works
- [ ] Multiple files create tabs
- [ ] Tab switching works
- [ ] Tab closing works
- [ ] Markdown renders correctly
- [ ] Code blocks show syntax highlighting
- [ ] Copy button works
- [ ] Math renders
- [ ] Tables render
- [ ] Dark mode works
- [ ] Light mode works
- [ ] System theme works
- [ ] Mobile layout works
- [ ] No console errors

- [ ] **Step 5: Commit production build**

```bash
git add .
git commit -m "feat: configure production build and verify deployment"
```

---

## Summary

**Total Tasks:** 15

**Task Dependency Chain:**
1. Project Scaffolding → 2. Design Tokens → 3. Document State → 4. File Upload → 5. Empty State → 6. Tab System → 7. Markdown Pipeline → 8. Markdown Renderer → 9. App Shell → 10. Syntax Highlighting → 11. Responsive Polish → 12. KaTeX → 13. Error Handling → 14. Accessibility → 15. Production Build

**Key Milestones:**
- Tasks 1-3: Foundation (scaffolding, themes, state)
- Tasks 4-6: File management (upload, UI, tabs)
- Tasks 7-8: Markdown rendering (parser, renderer)
- Tasks 9-10: App composition and styling
- Tasks 11-15: Polish and production readiness

**Estimated Time:** 2-3 hours for a skilled developer

**Final Deliverable:** A calm, polished Markdown reading environment with ChatGPT-quality rendering, browser-like tabs, and beautiful typography.
