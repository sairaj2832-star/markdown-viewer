import { useSyncExternalStore, useCallback } from 'react'
import type { DocumentFileType } from '../types'
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

  const addDocument = useCallback((file: File, content: string, fileType: DocumentFileType) => {
    return documentStore.addDocument(file, content, fileType)
  }, [])

  const addDocuments = useCallback((files: { file: File; content: string; fileType: DocumentFileType }[]) => {
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
