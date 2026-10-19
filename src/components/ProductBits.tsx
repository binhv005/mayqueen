import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import { useI18n } from '../i18n'
import { useCart } from '../state/cart'
import type { Product } from '../data/catalog'

export function AddButton({ productId, qty = 1, className = 'btn btn--primary', iconOnly = false }: { productId: string; qty?: number; className?: string; iconOnly?: boolean }) {
  const { t } = useI18n()
  const { add } = useCart()
  const [done, setDone] = useState(false)
  const timer = useRef<number>(0)
  return (
    <button
      className={`${className}${iconOnly ? ' btn--icon' : ''}`}
      aria-label={iconOnly ? (done ? t('product.added') : t('product.add')) : undefined}
      title={iconOnly ? t('product.add') : undefined}
      onClick={() => {
        add(productId, qty)
        setDone(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setDone(false), 1600)
      }}
    >
      {done ? <Check size={16} /> : <ShoppingBag size={16} />}
      {!iconOnly && (done ? t('product.added') : t('product.add'))}
    </button>
  )
}

export function PriceTag({ product }: { product: Product }) {
  const { t, money } = useI18n()
  return <span className="pricetag">{product.price == null ? t('product.priceNone') : money(product.price)}</span>
}

export function ProductCard({ product }: { product: Product }) {
  const { t, tr } = useI18n()
  return (
    <article className="pcard">
      <Link to={`/san-pham/${product.slug}`} className="pcard__img">
        <img src={product.image} alt={tr(product.gallery[0].alt)} width={800} height={800} loading="lazy" />
      </Link>
      <div className="pcard__body">
        <span className="eyebrow">{tr(product.type)}</span>
        <h3>{product.name}</h3>
        <p>{tr(product.short)}</p>
        <dl className="pcard__meta">
          <div><dt>{t('product.pack')}</dt><dd>{tr(product.pack)}</dd></div>
          <div><dd><PriceTag product={product} /></dd></div>
        </dl>
        <div className="pcard__actions">
          <Link className="btn btn--ghost" to={`/san-pham/${product.slug}`}>{t('product.detail')}</Link>
          <AddButton productId={product.id} />
        </div>
      </div>
    </article>
  )
}

export function ShopCard({ p }: { p: Product }) {
  const { t, tr, money } = useI18n()
  return (
    <article className="sc">
      <div className="sc__img">
        <Link to={`/san-pham/${p.slug}`} aria-label={p.name}>
          <img src={p.image} alt={tr(p.gallery[0].alt)} width={800} height={800} loading="lazy" />
        </Link>
        <AddButton productId={p.id} className="btn btn--leaf btn--sm sc__add" iconOnly />
      </div>
      <div className="sc__body">
        <span className="sc__type">{tr(p.type)}</span>
        <h3><Link to={`/san-pham/${p.slug}`}>{p.name}</Link></h3>
        <p className="sc__pack">{tr(p.pack)}</p>
        <p className="sc__price">{p.price == null ? t('product.priceNone') : money(p.price)}</p>
      </div>
    </article>
  )
}
