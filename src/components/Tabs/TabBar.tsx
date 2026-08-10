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
          name={doc.name}
          isActive={doc.id === activeDocumentId}
          onSelect={() => onSelectDocument(doc.id)}
          onClose={() => onCloseDocument(doc.id)}
        />
      ))}
    </div>
  )
}
