export type Theme = 'light' | 'dark' | 'system' | 'midnight' | 'nord' | 'solarized'

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
