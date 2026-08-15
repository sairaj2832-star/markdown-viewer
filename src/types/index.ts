export type Theme = 'light' | 'dark' | 'system' | 'midnight' | 'nord' | 'solarized' | 'sepia' | 'rose-pine' | 'matcha' | 'mocha' | 'e-ink' | 'high-contrast'

export type DocumentFileType = 'markdown' | 'text'

export interface Document {
  id: string
  name: string
  content: string
  size: number
  type: string
  fileType: DocumentFileType
}

export interface DocumentState {
  documents: Document[]
  activeDocumentId: string | null
}
