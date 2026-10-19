import { useEffect, useState } from 'react'
import { ArrowUp, MessageCircle, Phone } from 'lucide-react'
import { useI18n } from '../i18n'
import { contact } from '../data/catalog'

/** Floating call / Messenger shortcuts plus a back-to-top button that appears after scrolling. */
export function FloatingActions() {
  const { t } = useI18n()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fab">
      <button
        className={`fab__btn fab__btn--top${showTop ? ' is-on' : ''}`}
        aria-label={t('toTop')}
        title={t('toTop')}
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={22} />
      </button>
      <a className="fab__btn fab__btn--call" href={`tel:${contact.tel}`} aria-label={`${t('contact.call')} ${contact.hotline}`} title={contact.hotline}>
        <Phone size={22} />
      </a>
      <a className="fab__btn fab__btn--chat" href={contact.messenger} target="_blank" rel="noopener noreferrer" aria-label={t('contact.messenger')} title={t('contact.messenger')}>
        <MessageCircle size={22} />
      </a>
    </div>
  )
}
