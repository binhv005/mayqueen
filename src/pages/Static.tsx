import { Link, useParams } from 'react-router-dom'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { Facebook } from '../components/Icons'
import { useI18n } from '../i18n'
import { contact, images } from '../data/catalog'
import { faqs, policies } from '../data/content'
import { ConsultForm } from '../components/ConsultForm'
import { useTitle } from '../useTitle'

export function Contact() {
  const { t, tr } = useI18n()
  useTitle(t('contact.title'), t('contact.sub'))
  return (
    <>
      <header className="ct2-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${images.heroBg})` }}>
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.sub')}</p>
        </div>
      </header>

      <section className="ct2">
        <div className="container ct2__card">
          <div className="ct2__info">
            <h2>{t('contact.touch')}</h2>
            <p className="muted">{tr({ vi: 'MayqueenSlim Official luôn lắng nghe và đồng hành cùng bạn trên hành trình chăm sóc bản thân.', en: 'MayqueenSlim Official is here to listen and support you on your self-care journey.' })}</p>
            <ul className="ct2__list">
              <li>
                <span className="ct2__ico"><MapPin size={20} /></span>
                <div>
                  <strong>{t('contact.address')}</strong>
                  <p>{t('contact.addressVal')}</p>
                  <small className="muted">{t('contact.addrPending')}</small>
                </div>
              </li>
              <li>
                <span className="ct2__ico"><Phone size={20} /></span>
                <div>
                  <strong>{t('contact.hotline')}</strong>
                  <p><a href={`tel:${contact.tel}`}>{contact.hotline}</a> ({contact.person})</p>
                </div>
              </li>
              <li>
                <span className="ct2__ico"><MessageCircle size={20} /></span>
                <div>
                  <strong>{t('contact.chat')}</strong>
                  <p><a href={contact.messenger} target="_blank" rel="noopener noreferrer">{t('contact.messenger')}</a></p>
                </div>
              </li>
            </ul>
            <div className="ct2__follow">
              <strong>{t('contact.follow')}</strong>
              <div>
                <a className="ct2__ico ct2__ico--sm" href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={16} /></a>
                <a className="ct2__ico ct2__ico--sm" href={contact.messenger} target="_blank" rel="noopener noreferrer" aria-label="Messenger"><MessageCircle size={16} /></a>
              </div>
            </div>
          </div>
          <div className="ct2__form">
            <h2>{t('contact.send')}</h2>
            <ConsultForm grid />
          </div>
        </div>
      </section>

      <section className="ct2-map" aria-label={t('footer.mapTitle')}>
        <iframe
          title={t('footer.mapTitle')}
          src={`https://www.google.com/maps?q=${encodeURIComponent(t('contact.addressVal'))}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a className="ct2-map__open" href={contact.maps} target="_blank" rel="noopener noreferrer"><MapPin size={14} /> {t('contact.view')}</a>
      </section>
    </>
  )
}

export function Faq() {
  const { t, tr } = useI18n()
  useTitle(t('faq.title'))
  return (
    <section className="section">
      <div className="container narrow">
        <h1>{t('faq.title')}</h1>
        {faqs.map((f, i) => (
          <details key={i} className="faq">
            <summary>{tr(f.q)}</summary>
            <p>{tr(f.a)}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Policy() {
  const { id = '' } = useParams()
  const { t, tr } = useI18n()
  const p = policies[id]
  useTitle(p ? tr(p.title) : t('notfound.title'))
  return (
    <section className="section">
      <div className="container narrow">
        {p ? (
          <>
            <h1>{tr(p.title)}</h1>
            <p className="notice">{t('policy.pending')}</p>
          </>
        ) : (
          <h1>{t('notfound.title')}</h1>
        )}
      </div>
    </section>
  )
}

export function NotFound() {
  const { t } = useI18n()
  useTitle(t('notfound.title'))
  return (
    <section className="section">
      <div className="container empty">
        <h1>{t('notfound.title')}</h1>
        <p>{t('notfound.desc')}</p>
        <Link className="btn btn--primary" to="/">{t('done.home')}</Link>
      </div>
    </section>
  )
}

