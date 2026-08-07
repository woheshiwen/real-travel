import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

const logoSrc = `${import.meta.env.BASE_URL}brand/logo-nav.png`

type Props = {
  variant?: 'overlay' | 'solid'
  cta?: { to: string; label: string } | { href: string; label: string }
}

export default function SiteChrome({ variant = 'solid', cta }: Props) {
  const { t } = useI18n()
  const resolvedCta = cta ?? { to: '/plan', label: t.navPlan }

  return (
    <header className={`topnav topnav--${variant === 'overlay' ? 'cine' : 'solid'}`}>
      <Link to="/" className="brand" aria-label={`${t.brand} Real Travel`}>
        <span className="brand__logo-wrap">
          <img
            className="brand__logo"
            src={logoSrc}
            alt=""
            width={120}
            height={142}
            decoding="async"
          />
        </span>
        <span className="visually-hidden">{t.brand}</span>
      </Link>
      <div className="topnav__end">
        <nav className="topnav__links">
          <NavLink to="/" end>
            {t.navHome}
          </NavLink>
          <NavLink to="/trip/xian">{t.navTrip}</NavLink>
          <NavLink to="/community">{t.navCommunity}</NavLink>
          {'href' in resolvedCta ? (
            <a className="btn btn--small btn--primary" href={resolvedCta.href}>
              {resolvedCta.label}
            </a>
          ) : (
            <Link className="btn btn--small btn--primary" to={resolvedCta.to}>
              {resolvedCta.label}
            </Link>
          )}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
