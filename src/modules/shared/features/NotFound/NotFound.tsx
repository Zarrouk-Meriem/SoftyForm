import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation('translation')

  return <div className="shared_not_found">{t('not_found')}</div>
}

export default NotFound
