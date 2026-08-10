import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '../types'

const STORAGE_KEY = 'markdown-viewer-theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

function getStoredTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ['light', 'dark', 'system', 'midnight', 'nord', 'solarized'].includes(stored)) {
      return stored as Theme
    }
  }
  return 'system'
}

function isDarkTheme(theme: Theme): boolean {
  return theme === 'dark' || theme === 'midnight' || theme === 'nord' || theme === 'solarized'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    return theme === 'system' ? getSystemTheme() : isDarkTheme(theme) ? 'dark' : 'light'
  })

  const applyTheme = useCallback((t: 'light' | 'dark', themeClass?: string) => {
    const root = document.documentElement
    root.classList.remove('light', 'dark', 'midnight', 'nord', 'solarized')
    if (themeClass) {
      root.classList.add(themeClass)
    } else {
      root.classList.add(t)
    }
    setResolvedTheme(t)
  }, [])

  useEffect(() => {
    if (theme === 'system') {
      applyTheme(getSystemTheme())
    } else if (theme === 'midnight' || theme === 'nord' || theme === 'solarized') {
      applyTheme('dark', theme)
    } else {
      applyTheme(theme)
    }
  }, [theme, applyTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      applyTheme(getSystemTheme())
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }, [])

  return { theme, resolvedTheme, setTheme }
}
