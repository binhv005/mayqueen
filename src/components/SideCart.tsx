import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { useCart } from '../state/cart'
import { CartLines, CartTotals } from './CartParts'

export function SideCart() {
  const { t } = useI18n()
  const { open, setOpen, lines } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  return (
    <div className={`sidecart${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="sidecart__scrim" onClick={() => setOpen(false)} />
      <aside className="sidecart__panel" role="dialog" aria-modal="true" aria-label={t('cart.title')} inert={!open}>
        <div className="sidecart__head">
          <h2>{t('cart.title')}</h2>
          <button className="icon-btn" aria-label={t('nav.close')} onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="empty">
            <ShoppingBag size={36} aria-hidden />
            <p>{t('cart.empty')}</p>
            <Link className="btn btn--primary" to="/san-pham" onClick={() => setOpen(false)}>
              {t('cart.continue')}
            </Link>
          </div>
        ) : (
          <>
            <div className="sidecart__body">
              <CartLines compact />
            </div>
            <div className="sidecart__foot">
              <CartTotals />
              <Link className="btn btn--primary btn--block" to="/thanh-toan" onClick={() => setOpen(false)}>
                {t('cart.checkout')}
              </Link>
              <div className="sidecart__links">
                <button className="link" onClick={() => setOpen(false)}>{t('cart.continue')}</button>
                <Link className="link" to="/gio-hang" onClick={() => setOpen(false)}>{t('cart.viewCart')}</Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
