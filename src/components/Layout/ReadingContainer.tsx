interface ReadingContainerProps {
  children: React.ReactNode
}

export function ReadingContainer({ children }: ReadingContainerProps) {
  return (
    <main id="main-content" className="flex-1 overflow-y-auto bg-[var(--color-bg)] transition-colors duration-300 ease-in-out">
      {children}
    </main>
  )
}
