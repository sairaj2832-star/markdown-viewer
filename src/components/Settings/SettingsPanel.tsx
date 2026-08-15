import { motion, AnimatePresence } from 'framer-motion'
import { X, Palette } from 'lucide-react'
import { ThemePicker } from './ThemePicker'
import { FontSizeSlider } from './FontSizeSlider'
import { ReadingWidthSlider } from './ReadingWidthSlider'
import type { Theme } from '../../types'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
  fontSize: number
  onFontSizeChange: (size: number) => void
  readingWidth: number
  onReadingWidthChange: (width: number) => void
}

export function SettingsPanel({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  readingWidth,
  onReadingWidthChange,
}: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-[340px] max-w-[90vw] bg-[var(--color-bg)] border-l border-[var(--color-border)] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-[var(--color-surface)] rounded-lg">
                  <Palette className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <h2 className="text-base font-semibold text-[var(--color-text-primary)] tracking-tight">
                  Reading Preferences
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-colors"
                aria-label="Close settings"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7 reading-scroll">
              {/* Typography section */}
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-4">
                  Typography
                </h3>
                <div className="space-y-5">
                  <FontSizeSlider value={fontSize} onChange={onFontSizeChange} />
                  <ReadingWidthSlider value={readingWidth} onChange={onReadingWidthChange} />
                </div>
              </section>

              <hr className="border-[var(--color-border)]" />

              {/* Theme section */}
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-4">
                  Color Theme
                </h3>
                <ThemePicker currentTheme={theme} onThemeChange={onThemeChange} />
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
