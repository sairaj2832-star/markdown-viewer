export type Theme = 'light' | 'dark' | 'system' | 'midnight' | 'nord' | 'solarized'

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
