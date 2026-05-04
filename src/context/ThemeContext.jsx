import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

function getAutoTheme() {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || getAutoTheme()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const now = new Date()
    const nextCheck = new Date(now)
    const hour = now.getHours()

    if (hour < 6) {
      nextCheck.setHours(6, 0, 0, 0)
    } else if (hour < 18) {
      nextCheck.setHours(18, 0, 0, 0)
    } else {
      nextCheck.setDate(nextCheck.getDate() + 1)
      nextCheck.setHours(6, 0, 0, 0)
    }

    const msUntilNext = nextCheck - now
    const timer = setTimeout(() => {
      if (!localStorage.getItem('theme-manual')) {
        setTheme(getAutoTheme())
      }
    }, msUntilNext)

    return () => clearTimeout(timer)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme-manual', '1')
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
