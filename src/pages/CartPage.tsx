import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useI18n } from '../i18n'
import { useCart } from '../state/cart'
import { CartLines, CartTotals } from '../components/CartParts'
import { useTitle } from '../useTitle'

export default function CartPage() {
  const { t } = useI18n()
  const { lines } = useCart()
  useTitle(t('cart.title'))
  return (
    <section className="section">
      <div className="container narrow">
        <h1>{t('cart.title')}</h1>
        {lines.length === 0 ? (
          <div className="empty">
            <ShoppingBag size={36} aria-hidden />
            <p>{t('cart.empty')}</p>
            <Link className="btn btn--primary" to="/san-pham">{t('cart.continue')}</Link>
          </div>
        ) : (
          <>
            <CartLines />
            <CartTotals />
            <div className="hero__cta">
              <Link className="btn btn--ghost" to="/san-pham">{t('cart.continue')}</Link>
              <Link className="btn btn--primary" to="/thanh-toan">{t('cart.checkout')}</Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
