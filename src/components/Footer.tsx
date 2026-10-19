import { Link } from 'react-router-dom'
import { ChevronRight, ExternalLink, MessageCircle, Phone } from 'lucide-react'
import { Facebook } from './Icons'
import { useI18n } from '../i18n'
import type { Key } from '../i18n'
import { contact } from '../data/catalog'
import { Wordmark } from './Layout'
import footerBg from '../assets/img/footer-bg.jpg'

const explore: { to: string; key: Key }[] = [
  { to: '/gioi-thieu', key: 'nav.about' },
  { to: '/san-pham', key: 'nav.products' },
  { to: '/san-pham#combo', key: 'nav.combos' },
  { to: '/song-dep', key: 'nav.journal' },
  { to: '/lien-he', key: 'footer.consultLink' },
]

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.7)), url(${footerBg})` }}>
      <div className="container f-grid">
        <div className="f-brand">
          <Wordmark />
          <blockquote>“{t('brand.tagline')}” {t('footer.about')}</blockquote>
          <div className="f-social">
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href={contact.messenger} target="_blank" rel="noopener noreferrer" aria-label={t('contact.messenger')}><MessageCircle size={18} /></a>
            <a href={`tel:${contact.tel}`} aria-label={`${t('contact.call')} ${contact.hotline}`}><Phone size={18} /></a>
          </div>
        </div>

        <nav className="f-explore" aria-label={t('footer.explore')}>
          <h3 className="f-title"><span>{t('footer.explore')}</span></h3>
          <ul>
            {explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to}><ChevronRight size={16} aria-hidden /> {t(l.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="f-map">
          <div className="f-map__head">
            <h3 className="f-title"><span>{t('footer.mapTitle')}</span></h3>
            <a href={contact.maps} target="_blank" rel="noopener noreferrer">{t('footer.openMaps')} <ExternalLink size={14} aria-hidden /></a>
          </div>
          <iframe
            title={t('footer.mapTitle')}
            src={`https://www.google.com/maps?q=${encodeURIComponent(t('contact.addressVal'))}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} MayqueenSlim Official</p>
      </div>
    </footer>
  )
}
