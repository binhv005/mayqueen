import { useState } from 'react'
import { useI18n } from '../i18n'
import type { Key } from '../i18n'
import { products } from '../data/catalog'
import { submitConsultation } from '../data/api'

type Errors = Partial<Record<'name' | 'phone' | 'message' | 'consent', Key>>
const PHONE = /^0\d{9}$/

export function ConsultForm({ grid = false }: { grid?: boolean }) {
  const { t } = useI18n()
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '', consent: false, website: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle')
  const [demo, setDemo] = useState(false)

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (!form.name.trim()) next.name = 'err.required'
    if (!PHONE.test(form.phone.replace(/[\s.-]/g, ''))) next.phone = 'err.phone'
    if (form.message.length > 500) next.message = 'err.msgLong'
    if (!form.consent) next.consent = 'err.consent'
    setErrors(next)
    if (Object.keys(next).length) return
    // Honeypot: bots fill the hidden field; pretend success without sending.
    if (form.website) return setState('ok')
    setState('sending')
    try {
      const r = await submitConsultation({
        name: form.name.trim(),
        phone: form.phone.replace(/[\s.-]/g, ''),
        interestedProduct: form.product,
        message: form.message.trim(),
        consent: true,
        createdAt: new Date().toISOString(),
      })
      setDemo(r.demo)
      setState('ok')
      setForm({ name: '', phone: '', product: '', message: '', consent: false, website: '' })
    } catch {
      setState('fail')
    }
  }

  const err = (k: keyof Errors) => (errors[k] ? <span className="field__err" id={`e-${k}`} role="alert">{t(errors[k]!)}</span> : null)

  return (
    <form className={`consult${grid ? ' consult--grid' : ''}`} onSubmit={onSubmit} noValidate>
      <label className="field">
        <span>{t('consult.name')} *</span>
        <input value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" maxLength={80} aria-invalid={!!errors.name} aria-describedby="e-name" />
        {err('name')}
      </label>
      <label className="field">
        <span>{t('consult.phone')} *</span>
        <input value={form.phone} onChange={(e) => set('phone', e.target.value)} inputMode="tel" autoComplete="tel" maxLength={15} aria-invalid={!!errors.phone} aria-describedby="e-phone" />
        {err('phone')}
      </label>
      <label className="field">
        <span>{t('consult.product')}</span>
        <select value={form.product} onChange={(e) => set('product', e.target.value)}>
          <option value="">{t('consult.opt.any')}</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
          <option value="combo">Combo</option>
        </select>
      </label>
      <label className="field">
        <span>{t('consult.message')}</span>
        <textarea rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby="e-message" />
        {err('message')}
        <small className="muted">{t('consult.hint')}</small>
      </label>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={form.website} onChange={(e) => set('website', e.target.value)} name="website" />
      <label className="check">
        <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
        <span>
          {t('consult.consent')}
        </span>
      </label>
      {err('consent')}
      <button className="btn btn--primary" disabled={state === 'sending'}>
        {state === 'sending' ? t('consult.sending') : t('consult.submit')}
      </button>
      <div aria-live="polite">
        {state === 'ok' && (
          <p className="notice notice--ok">
            {t('consult.ok')} {demo && <em>{t('consult.demo')}</em>}
          </p>
        )}
        {state === 'fail' && <p className="notice notice--err">{t('consult.fail')}</p>}
      </div>
    </form>
  )
}
