interface ReadingContainerProps {
  children: React.ReactNode
}

export function ReadingContainer({ children }: ReadingContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
      {children}
    </main>
  )
}
