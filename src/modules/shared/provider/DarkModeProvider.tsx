import { ReactNode, useContext, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'

interface Props {
  children: ReactNode
}

const DarkModeProvider = ({ children }: Props) => {
  const { darkTheme } = useContext(ThemeContext)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const isDarkTheme =
      localStorage.getItem('theme') === 'dark'
        ? true
        : localStorage.getItem('theme')
          ? false
          : mediaQuery.matches

    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light')

    if (darkTheme) document.body.classList.add('dark_mode')
    else document.body.classList.remove('dark_mode')

    const themeBackGround = isDarkTheme ? '#18191A' : '#ffffff'
    const bodyElement: HTMLElement | null = document.querySelector('#body')

    if (bodyElement) {
      bodyElement.style.backgroundColor = themeBackGround
    }
  }, [darkTheme])

  return children
}

export default DarkModeProvider
