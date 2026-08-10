import { AnimatePresence } from 'framer-motion'
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
    <div className="flex items-center gap-1 px-2 py-1 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] overflow-x-auto scrollbar-hide">
      <AnimatePresence mode="popLayout">
        {documents.map(doc => (
          <Tab
            key={doc.id}
            document={doc}
            isActive={doc.id === activeDocumentId}
            onSelect={onSelectDocument}
            onClose={onCloseDocument}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
