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
