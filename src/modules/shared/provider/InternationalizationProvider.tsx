import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  children: ReactNode
}

const InternationalizationProvider = ({ children }: Props) => {
  const { i18n } = useTranslation('translation')

  useEffect(() => {
    document.body.dir = i18n?.dir()

    if (i18n.language === 'ar') {
      document.body.classList.add('app_i18n')
    } else {
      document.body.classList.remove('app_i18n')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  return <div dir={i18n?.dir()}>{children}</div>
}

export default InternationalizationProvider
