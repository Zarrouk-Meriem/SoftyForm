import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from '../../provider/ThemeContext'
import darkIcon from '../../assets/icons/mode/dark-moon.svg'
import lightIcon from '../../assets/icons/mode/light-moon.svg'

const ThemeToggler = () => {
  const { t } = useTranslation('translation')
  const { toggleTheme, darkTheme } = useContext(ThemeContext)

  return (
    <div className="shared_theme_toggler" onClick={toggleTheme}>
      <button className="shared_theme_toggler_btn">
        <img
          className="shared_theme_toggler_btn_img"
          src={darkTheme ? darkIcon : lightIcon}
          alt="mode"
        />
        {t('mode')}
      </button>
    </div>
  )
}

export default ThemeToggler
