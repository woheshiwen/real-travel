import { Link, NavLink } from 'react-router-dom'

type Props = {
  variant?: 'overlay' | 'solid'
  cta?: { to: string; label: string } | { href: string; label: string }
}

export default function SiteChrome({
  variant = 'solid',
  cta = { to: '/plan', label: '开始规划' },
}: Props) {
  return (
    <header className={`topnav topnav--${variant === 'overlay' ? 'cine' : 'solid'}`}>
      <Link to="/" className="brand">
        <span className="brand__mark">真程</span>
        <span className="brand__en">Real Travel</span>
      </Link>
      <nav className="topnav__links">
        <NavLink to="/" end>
          首页
        </NavLink>
        <NavLink to="/trip/xian">路书</NavLink>
        <NavLink to="/community">足迹</NavLink>
        {'href' in cta ? (
          <a className="btn btn--small btn--primary" href={cta.href}>
            {cta.label}
          </a>
        ) : (
          <Link className="btn btn--small btn--primary" to={cta.to}>
            {cta.label}
          </Link>
        )}
      </nav>
    </header>
  )
}
