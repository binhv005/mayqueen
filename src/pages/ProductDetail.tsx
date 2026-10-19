import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useI18n } from '../i18n'
import { getProduct, products } from '../data/catalog'
import { AddButton, PriceTag, ProductCard } from '../components/ProductBits'
import { useTitle } from '../useTitle'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const { t, tr } = useI18n()
  const product = getProduct(slug)
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  useTitle(product?.name ?? t('product.notFound'), product ? tr(product.short) : undefined)

  if (!product) {
    return (
      <section className="section"><div className="container empty">
        <h1>{t('product.notFound')}</h1>
        <Link className="btn btn--primary" to="/san-pham">{t('list.title')}</Link>
      </div></section>
    )
  }
  const others = products.filter((p) => p.id !== product.id).slice(0, 2)
  const img = product.gallery[active] ?? product.gallery[0]

  return (
    <>
      <section className="section">
        <div className="container pdp">
          <div className="pdp__gallery">
            <img className="pdp__main" src={img.src} alt={tr(img.alt)} width={1000} height={1000} fetchPriority="high" />
            <div className="pdp__thumbs" role="group" aria-label={t('product.gallery')}>
              {product.gallery.map((g, i) => (
                <button key={g.src} className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} aria-label={tr(g.alt)} aria-pressed={i === active}>
                  <img src={g.src} alt="" width={120} height={120} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <div className="pdp__info">
            <span className="eyebrow">{tr(product.type)}</span>
            <h1>{product.name}</h1>
            <p className="pdp__price"><PriceTag product={product} /></p>
            <p>{tr(product.long)}</p>
            <dl className="specs">
              <div><dt>{t('product.type')}</dt><dd>{tr(product.type)}</dd></div>
              <div><dt>{t('product.pack')}</dt><dd>{tr(product.pack)}</dd></div>
              {product.packText && <div><dt>{t('product.packText')}</dt><dd>{tr(product.packText)}</dd></div>}
            </dl>
            <div className="pdp__buy">
              <div className="qty qty--lg" role="group" aria-label={t('product.qty')}>
                <button aria-label={t('cart.decrease')} onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span aria-live="polite">{qty}</span>
                <button aria-label={t('cart.increase')} onClick={() => setQty((q) => Math.min(99, q + 1))}><Plus size={16} /></button>
              </div>
              <AddButton productId={product.id} qty={qty} />
            </div>
            <p className="muted small">{t('story.note')}</p>
          </div>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container pgrid">
          {others.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  )
}
