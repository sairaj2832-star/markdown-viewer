import { SkipLink } from './SkipLink'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <SkipLink />
      {children}
    </div>
  )
}
