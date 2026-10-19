import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { Key } from '../i18n'
import { useCart } from '../state/cart'
import { CartLines, CartTotals } from '../components/CartParts'
import { submitOrder } from '../data/api'
import { useTitle } from '../useTitle'

type Field = 'name' | 'phone' | 'address' | 'city' | 'district'
const PHONE = /^0\d{9}$/

function newOrderCode() {
  const d = new Date()
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0, 5).padStart(5, '0')
  return `MQ${stamp}-${rand}`
}

export default function Checkout() {
  const { t } = useI18n()
  const { lines, clear } = useCart()
  const navigate = useNavigate()
  useTitle(t('checkout.title'))
  const [f, setF] = useState({ name: '', phone: '', address: '', city: '', district: '', note: '' })
  const [errors, setErrors] = useState<Partial<Record<Field, Key>>>({})
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  if (lines.length === 0) return <Navigate to="/gio-hang" replace />

  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: Partial<Record<Field, Key>> = {}
    if (!f.name.trim()) next.name = 'err.required'
    if (!PHONE.test(f.phone.replace(/[\s.-]/g, ''))) next.phone = 'err.phone'
    if (!f.address.trim()) next.address = 'err.required'
    if (!f.city.trim()) next.city = 'err.required'
    if (!f.district.trim()) next.district = 'err.required'
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    setFailed(false)
    const orderCode = newOrderCode()
    try {
      await submitOrder({
        orderCode,
        customerName: f.name.trim(),
        phone: f.phone.replace(/[\s.-]/g, ''),
        shippingAddress: { address: f.address.trim(), district: f.district.trim(), city: f.city.trim() },
        note: f.note.trim(),
        items: lines.map((l) => ({ productId: l.productId, qty: l.qty })),
        paymentMethod: 'cod',
        createdAt: new Date().toISOString(),
      })
      clear()
      navigate(`/dat-hang-thanh-cong/${orderCode}`)
    } catch {
      setFailed(true)
      setBusy(false)
    }
  }

  const input = (k: Field, label: Key, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="field">
      <span>{t(label)} *</span>
      <input value={f[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} maxLength={120} {...extra} />
      {errors[k] && <span className="field__err" role="alert">{t(errors[k]!)}</span>}
    </label>
  )

  return (
    <section className="section">
      <div className="container checkout">
        <form onSubmit={onSubmit} noValidate>
          <h1>{t('checkout.title')}</h1>
          {input('name', 'checkout.name', { autoComplete: 'name' })}
          {input('phone', 'checkout.phone', { inputMode: 'tel', autoComplete: 'tel', maxLength: 15 })}
          {input('address', 'checkout.address', { autoComplete: 'street-address' })}
          <div className="row2">
            {input('city', 'checkout.city', { autoComplete: 'address-level1' })}
            {input('district', 'checkout.district', { autoComplete: 'address-level2' })}
          </div>
          <label className="field">
            <span>{t('checkout.note')}</span>
            <textarea rows={3} maxLength={300} value={f.note} onChange={(e) => set('note', e.target.value)} />
          </label>
          <fieldset className="field">
            <legend>{t('checkout.payment')}</legend>
            <label className="check check--center"><input type="radio" checked readOnly /> <span>{t('checkout.cod')}</span></label>
          </fieldset>
          <button className="btn btn--primary btn--block" disabled={busy}>{busy ? t('checkout.placing') : t('checkout.place')}</button>
          <div aria-live="polite">{failed && <p className="notice notice--err">{t('checkout.fail')}</p>}</div>
        </form>
        <aside className="checkout__summary">
          <h2>{t('checkout.summary')}</h2>
          <CartLines compact />
          <CartTotals withShipping />
          <Link className="link" to="/gio-hang">{t('cart.viewCart')}</Link>
        </aside>
      </div>
    </section>
  )
}
