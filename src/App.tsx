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
