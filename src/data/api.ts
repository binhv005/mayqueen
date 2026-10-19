/**
 * Thin client for the future backend. When VITE_API_URL is not set the app runs in demo mode:
 * payloads are stored in localStorage only and `demo: true` is returned so the UI can say so.
 */
const API = import.meta.env.VITE_API_URL as string | undefined

export interface SubmitResult {
  demo: boolean
}

async function submit(path: string, storeKey: string, payload: unknown): Promise<SubmitResult> {
  if (API) {
    const res = await fetch(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { demo: false }
  }
  try {
    const prev = JSON.parse(localStorage.getItem(storeKey) ?? '[]')
    localStorage.setItem(storeKey, JSON.stringify([...prev, payload]))
  } catch {
    throw new Error('storage unavailable')
  }
  return { demo: true }
}

export interface ConsultationPayload {
  name: string
  phone: string
  interestedProduct: string
  message: string
  consent: boolean
  createdAt: string
}

export const submitConsultation = (p: ConsultationPayload) => submit('/api/consultations', 'mq_consultations', p)

export interface OrderPayload {
  orderCode: string
  customerName: string
  phone: string
  shippingAddress: { address: string; district: string; city: string }
  note: string
  /** Only ids and quantities: the server must price the order itself */
  items: { productId: string; qty: number }[]
  paymentMethod: 'cod'
  createdAt: string
}

export async function submitOrder(p: OrderPayload) {
  const r = await submit('/api/orders', 'mq_orders', p)
  try {
    localStorage.setItem('mq_last_order', JSON.stringify(p))
  } catch {
    /* ignore */
  }
  return r
}

export function loadLastOrder(code: string): OrderPayload | null {
  try {
    const o = JSON.parse(localStorage.getItem('mq_last_order') ?? 'null') as OrderPayload | null
    return o && o.orderCode === code ? o : null
  } catch {
    return null
  }
}
