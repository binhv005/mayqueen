import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { combos, getProduct } from '../data/catalog'
import { useCart } from '../state/cart'
import { Price } from '../components/CartParts'
import { Reveal } from '../components/Reveal'

export function ComboSection() {
  const { t, tr, money } = useI18n()
  const { add } = useCart()

  return (
    <section className="section section--cream" id="combo">
      <div className="container">
        <div className="section__head section__head--wide">
          <h2>{t('combo.title')}</h2>
          <p>{t('combo.desc')}</p>
        </div>
        {combos.map((c) => {
          const parts = c.items.map((i) => ({ ...i, product: getProduct(i.productId)! }))
          const separate = parts.every((p) => p.product.price != null)
            ? parts.reduce((n, p) => n + p.product.price! * p.qty, 0)
            : null
          const saving = c.price != null && separate != null && separate > c.price ? separate - c.price : null
          return (
            <article key={c.id} className="combo">
              <Reveal className="combo__media" variant="zoom"><img src={c.image} alt="" width={900} height={900} loading="lazy" /></Reveal>
              <Reveal className="combo__copy" variant="right" delay={150}>
                <h2>{tr(c.name)}</h2>
                <h3 className="small-h">{t('combo.includes')}</h3>
                <ul className="combo__list">
                  {parts.map((p) => (
                    <li key={p.productId}>
                      {p.qty} × <Link to={`/san-pham/${p.product.slug}`}>{p.product.name}</Link>{' '}
                      <span className="muted">({tr(p.product.pack)}{p.product.price != null ? ` · ${money(p.product.price)}` : ''})</span>
                    </li>
                  ))}
                </ul>
                <p className="combo__price">{c.price == null ? t('combo.pricePending') : <Price value={c.price} />}</p>
                {saving != null && <p className="muted">{t('combo.save', { n: money(saving) })}</p>}
                <div className="hero__cta">
                  <button className="btn btn--primary" onClick={() => c.items.forEach((i, idx) => add(i.productId, i.qty, idx === c.items.length - 1))}>
                    {t('combo.choose')}
                  </button>
                  <Link className="btn btn--ghost" to="/lien-he">{t('combo.consult')}</Link>
                </div>
              </Reveal>
            </article>
          )
        })}
      </div>
    </section>
  )
}
