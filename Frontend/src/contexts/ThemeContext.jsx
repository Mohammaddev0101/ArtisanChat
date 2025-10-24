'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Avoid SSR hydration issue: set initial = null, not 'light'
  const [theme, setTheme] = useState(null)
  const initialSet = useRef(false)

  // Restore theme from localStorage or system preference on mount (client only)
  useEffect(() => {
    // Make sure this runs only on client
    let resolvedTheme
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (savedTheme === 'light' || savedTheme === 'dark') {
      resolvedTheme = savedTheme
    } else {
      // Check system preference
      const prefersDark = window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
      resolvedTheme = prefersDark ? 'dark' : 'light'
    }
    setTheme(resolvedTheme)
    initialSet.current = true
  }, [])

  // Actually change the <html> class and persist when theme changes
  useEffect(() => {
    if (!theme) return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Avoid rendering children on first pass until the theme is resolved
  if (theme === null) {
    return null
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}