import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useSettings } from './hooks/useSettings'
import { useDocuments } from './hooks/useDocuments'
import { useFileUpload } from './hooks/useFileUpload'
import { AppShell } from './components/Layout/AppShell'
import { Header } from './components/Layout/Header'
import { ReadingContainer } from './components/Layout/ReadingContainer'
import { TabBar } from './components/Tabs/TabBar'
import { EmptyState } from './components/Upload/EmptyState'
import { DropZone } from './components/Upload/DropZone'
import { DocumentViewer } from './components/Viewer/DocumentViewer'
import { SettingsPanel } from './components/Settings/SettingsPanel'

function App() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { settings, updateSettings } = useSettings()
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
        <TabBar
          documents={documents}
          activeDocumentId={activeDocumentId}
          onSelectDocument={setActiveDocument}
          onCloseDocument={removeDocument}
        />
        <ReadingContainer documentId={activeDocumentId}>
          {activeDocument ? (
            <DocumentViewer
              document={activeDocument}
              fontSize={settings.fontSize}
              readingWidth={settings.readingWidth}
              resolvedTheme={resolvedTheme}
            />
          ) : (
            <EmptyState onFileSelect={handleFileSelect} errors={errors} />
          )}
        </ReadingContainer>
      </DropZone>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        fontSize={settings.fontSize}
        onFontSizeChange={(size) => updateSettings({ fontSize: size })}
        readingWidth={settings.readingWidth}
        onReadingWidthChange={(width) => updateSettings({ readingWidth: width })}
      />
    </AppShell>
  )
}

export default App
