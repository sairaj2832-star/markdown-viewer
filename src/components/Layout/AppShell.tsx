import { SkipLink } from './SkipLink'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-colors duration-300 ease-in-out antialiased">
      <SkipLink />
      {children}
    </div>
  )
}
