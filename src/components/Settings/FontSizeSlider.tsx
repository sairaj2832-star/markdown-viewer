interface FontSizeSliderProps {
  value: number
  onChange: (value: number) => void
}

export function FontSizeSlider({ value, onChange }: FontSizeSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-text-secondary)]">Font Size</span>
        <span className="text-[var(--color-text-primary)]">{value}px</span>
      </div>
      <input
        type="range"
        min="12"
        max="24"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
      />
    </div>
  )
}
