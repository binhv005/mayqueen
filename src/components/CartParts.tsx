import { Minus, Plus, Trash2 } from 'lucide-react'
import { useI18n } from '../i18n'
import { useCart } from '../state/cart'
import { getProduct } from '../data/catalog'

export function Price({ value }: { value: number | null }) {
  const { t, money } = useI18n()
  return <>{value == null ? t('cart.priceTbd') : money(value)}</>
}

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { t, money } = useI18n()
  const { lines, setQty, remove } = useCart()
  return (
    <ul className={`cartlines${compact ? ' cartlines--compact' : ''}`}>
      {lines.map((l) => {
        const p = getProduct(l.productId)
        if (!p) return null
        return (
          <li key={l.productId}>
            <img src={p.image} alt="" width={96} height={96} loading="lazy" />
            <div className="cartlines__info">
              <strong>{p.name}</strong>
              <span className="muted">
                {t('cart.unit')}: {p.price == null ? t('product.priceNone') : money(p.price)}
              </span>
              <div className="qty" role="group" aria-label={t('product.qty')}>
                <button aria-label={t('cart.decrease')} onClick={() => setQty(l.productId, l.qty - 1)}>
                  <Minus size={14} />
                </button>
                <span aria-live="polite">{l.qty}</span>
                <button aria-label={t('cart.increase')} onClick={() => setQty(l.productId, l.qty + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="cartlines__side">
              <strong>{p.price == null ? '—' : money(p.price * l.qty)}</strong>
              <button className="icon-btn" aria-label={`${t('cart.remove')} ${p.name}`} onClick={() => remove(l.productId)}>
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function CartTotals({ withShipping = false }: { withShipping?: boolean }) {
  const { t, money } = useI18n()
  const { subtotal, hasUnpriced } = useCart()
  return (
    <div className="totals">
      <div>
        <span>{t('cart.subtotal')}</span>
        <strong>{hasUnpriced ? (subtotal > 0 ? `${money(subtotal)} + ${t('cart.priceTbd')}` : t('cart.priceTbd')) : money(subtotal)}</strong>
      </div>
      {withShipping && (
        <div>
          <span>{t('checkout.shipping')}</span>
          <strong>{t('checkout.shipTbd')}</strong>
        </div>
      )}
      {withShipping && (
        <div className="totals__grand">
          <span>{t('checkout.total')}</span>
          <strong>{hasUnpriced ? t('cart.priceTbd') : money(subtotal)}</strong>
        </div>
      )}
      {hasUnpriced && <p className="muted small">{t('cart.quoteNote')}</p>}
    </div>
  )
}
