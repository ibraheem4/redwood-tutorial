import { useTranslation } from 'react-i18next'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const displayLanguageSwitcher = () => {
    return (
      <>
        <h1>{t('HomePage.header')}</h1>
        <button onClick={() => i18n.changeLanguage('fr')}>fr</button>
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
        <p>
          {t('HomePage.info')} <code>./web/src/pages/HomePage/HomePage.js</code>
        </p>
        <p>
          {t('HomePage.route')} <code>home</code>, {t('HomePage.link')}`
          <Link to={routes.home()}>Home</Link>`
        </p>
      </>
    )
  }

  return (
    <>
      <MetaTags
        title={t('HomePage.title')}
        description={t('HomePage.header')}
      />
      <ArticlesCell />
      {displayLanguageSwitcher()}
    </>
  )
}

export default HomePage
