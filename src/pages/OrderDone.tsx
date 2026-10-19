import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '../i18n'
import { loadLastOrder } from '../data/api'
import { getProduct } from '../data/catalog'
import { useTitle } from '../useTitle'

export default function OrderDone() {
  const { code = '' } = useParams()
  const { t } = useI18n()
  useTitle(t('done.title'))
  const order = loadLastOrder(code)

  return (
    <section className="section">
      <div className="container narrow center">
        {order ? (
          <>
            <CheckCircle2 size={48} className="ok" aria-hidden />
            <h1>{t('done.title')}</h1>
            <p>{t('done.code')}: <strong>{order.orderCode}</strong></p>
            <ul className="plain">
              {order.items.map((i) => (
                <li key={i.productId}>{i.qty} × {getProduct(i.productId)?.name}</li>
              ))}
            </ul>
            <p>{t('done.desc')}</p>
          </>
        ) : (
          <h1>{t('done.notFound')}</h1>
        )}
        <Link className="btn btn--primary" to="/">{t('done.home')}</Link>
      </div>
    </section>
  )
}
