import { useTranslation } from 'react-i18next'

const LanguageToggler = () => {
  const { t, i18n } = useTranslation('translation')

  const onChangeLanguage = (language: string) => {
    window.localStorage.setItem('language', language)
    i18n.changeLanguage(language)
  }

  return (
    <div className="shared_language_toggler">
      <button className="shared_language_toggler_btn" onClick={() => onChangeLanguage('en')}>
        {t('language.en')}
      </button>

      <button className="shared_language_toggler_btn" onClick={() => onChangeLanguage('fr')}>
        {t('language.fr')}
      </button>

      <button className="shared_language_toggler_btn" onClick={() => onChangeLanguage('ar')}>
        {t('language.ar')}
      </button>
    </div>
  )
}

export default LanguageToggler
