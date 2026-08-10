import { Link, NavLink } from 'react-router-dom'
import { useLang, langs, langNames, type Lang } from '../i18n'

const logoSrc = `${import.meta.env.BASE_URL}brand/logo-nav-lg.png`

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
      <Link to="/" className="brand" aria-label="Real Travel 真程">
        <img
          className="brand__logo"
          src={logoSrc}
          alt=""
          width={101}
          height={120}
          decoding="async"
        />
        <span className="visually-hidden">
          Real Travel 真程
        </span>
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
