import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '../types'

const STORAGE_KEY = 'markdown-viewer-theme'

const DARK_THEMES = ['dark', 'midnight', 'nord', 'solarized', 'rose-pine', 'mocha', 'high-contrast']
const LIGHT_THEMES = ['light', 'sepia', 'matcha', 'e-ink']
const ALL_THEMES = ['system', ...DARK_THEMES, ...LIGHT_THEMES]

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

function getStoredTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ALL_THEMES.includes(stored)) {
      return stored as Theme
    }
  }
  return 'system'
}

function isDarkTheme(theme: Theme): boolean {
  if (theme === 'system') {
    return getSystemTheme() === 'dark'
  }
  return DARK_THEMES.includes(theme)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    return isDarkTheme(theme) ? 'dark' : 'light'
  })

  const applyTheme = useCallback((currentTheme: Theme) => {
    const root = document.documentElement
    
    // Remove all possible theme classes
    root.classList.remove(...ALL_THEMES)
    
    const isDark = isDarkTheme(currentTheme)
    
    if (currentTheme === 'system') {
       root.classList.add(isDark ? 'dark' : 'light')
    } else {
       // We add the specific theme class
       root.classList.add(currentTheme)
       
       // We also add 'dark' class for highligh.js and other base dark styles
       // if it's a dark variant, and light for light variants.
       if (currentTheme !== 'dark' && currentTheme !== 'light') {
           root.classList.add(isDark ? 'dark' : 'light')
       }
    }
    setResolvedTheme(isDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      applyTheme('system')
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
