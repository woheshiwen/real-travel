import { Link, NavLink } from 'react-router-dom'
import { useLang, langs, langNames, type Lang } from '../i18n'

type Props = {
  variant?: 'overlay' | 'solid'
  cta?: { to: string; label: LangKey } | { href: string; label: LangKey }
}

type LangKey = 'nav.plan' | 'nav.preview' | 'trip.cta.calendar'

export default function SiteChrome({
  variant = 'solid',
  cta = { to: '/plan', label: 'nav.plan' },
}: Props) {
  const { lang, setLang, t } = useLang()

  return (
    <header className={`topnav topnav--${variant === 'overlay' ? 'cine' : 'solid'}`}>
      <Link to="/" className="brand">
        <span className="brand__mark">{t('brand.zh')}</span>
        <span className="brand__en">{t('brand.en')}</span>
      </Link>
      <nav className="topnav__links">
        <NavLink to="/" end>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/trip/xian">{t('nav.trip')}</NavLink>
        <NavLink to="/community">{t('nav.moments')}</NavLink>

        <div className="lang-switcher">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            aria-label="Language"
          >
            {langs.map((l) => (
              <option key={l} value={l}>
                {langNames[l]}
              </option>
            ))}
          </select>
        </div>

        {'href' in cta ? (
          <a className="btn btn--small btn--primary" href={cta.href}>
            {t(cta.label)}
          </a>
        ) : (
          <Link className="btn btn--small btn--primary" to={cta.to}>
            {t(cta.label)}
          </Link>
        )}
      </nav>
    </header>
  )
}
