import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, ShoppingBag, X, Phone } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Key } from '../i18n'
import { useCart } from '../state/cart'
import { contact } from '../data/catalog'
import { SideCart } from './SideCart'
import { Footer } from './Footer'
import { FloatingActions } from './FloatingActions'
import logo from '../assets/img/logo.png'

const links: { to: string; key: Key; end?: boolean }[] = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/san-pham', key: 'nav.products' },
  { to: '/song-dep', key: 'nav.journal' },
  { to: '/gioi-thieu', key: 'nav.about' },
  { to: '/lien-he', key: 'nav.contact' },
]

export function Wordmark() {
  return (
    <span className="wordmark" aria-label="MayqueenSlim Official">
      <img className="wordmark__logo" src={logo} alt="" width={40} height={40} />
      <span className="wordmark__main">Mayqueen<b>Slim</b></span>
      <span className="wordmark__sub">Official</span>
    </span>
  )
}

export function Layout() {
  const { t, lang, setLang } = useI18n()
  const { count, setOpen } = useCart()
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(false)
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // the target may live in a lazily loaded page, so retry briefly
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(hash.slice(1))
      if (el || ++tries > 30) {
        window.clearInterval(timer)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 60)
    return () => window.clearInterval(timer)
  }, [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menu])


  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`header${scrolled ? ' header--scrolled' : ''}${pathname === '/' && !scrolled ? ' header--over' : ''}`}>
        <div className="container header__bar">
          <button className="icon-btn header__burger" aria-label={t('nav.menu')} onClick={() => setMenu(true)}>
            <Menu />
          </button>
          <Link to="/" className="header__logo">
            <Wordmark />
          </Link>
          <nav className="header__nav" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}>
                {t(l.key)}
              </NavLink>
            ))}
          </nav>
          <div className="header__tools">
            <button className="icon-btn cart-btn" aria-label={`${t('nav.cart')} (${count})`} onClick={() => setOpen(true)}>
              <ShoppingBag />
              {count > 0 && <span className="cart-btn__badge">{count}</span>}
            </button>
            <div className="lang lang--head" role="group" aria-label={t('lang.switch')}>
              {(['vi', 'en'] as const).map((l) => (
                <button key={l} className={lang === l ? 'is-on' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {menu && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer__top">
            <Wordmark />
            <button className="icon-btn" aria-label={t('nav.close')} onClick={() => setMenu(false)}>
              <X />
            </button>
          </div>
          <nav className="drawer__nav">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}>
                {t(l.key)}
              </NavLink>
            ))}
          </nav>
          <a className="btn btn--primary drawer__call" href={`tel:${contact.tel}`}>
            <Phone size={16} /> {contact.hotline}
          </a>
        </div>
      )}

      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <SideCart />
    </>
  )
}
