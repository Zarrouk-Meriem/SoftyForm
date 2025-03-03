/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from 'react'

interface ContextProps {
  darkTheme: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ContextProps>({
  darkTheme: false,
  toggleTheme: () => {},
})

interface Props {
  children?: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark'
      ? true
      : localStorage.getItem('theme')
        ? false
        : mediaQuery.matches
  )

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => {
      if (prevState) {
        localStorage.setItem('theme', 'light')
      } else {
        localStorage.setItem('theme', 'dark')
      }
      return !prevState
    })
  }

  useEffect(() => {
    const userPreference = localStorage.getItem('theme')

    if (userPreference) return

    setDarkTheme(mediaQuery.matches)

    const handleThemeChange = (e: any) => {
      setDarkTheme(e.matches)
    }

    mediaQuery.addListener(handleThemeChange)

    return () => mediaQuery.removeListener(handleThemeChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkTheme])

  return (
    <ThemeContext.Provider
      value={{
        darkTheme: darkTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
