import type { Document, DocumentFileType, DocumentState } from '../types'

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

function getFileType(fileName: string): DocumentFileType {
  const ext = fileName.split('.').pop()?.toLowerCase()
  if (ext === 'txt' || ext === 'text' || ext === 'log') return 'text'
  return 'markdown'
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
      fileType: getFileType(file.name),
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
        fileType: getFileType(file.name),
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
