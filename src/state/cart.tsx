import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getProduct } from '../data/catalog'

export interface CartLine {
  productId: string
  qty: number
}

interface CartValue {
  lines: CartLine[]
  count: number
  /** Sum of priced lines; `hasUnpriced` tells the UI the total is incomplete */
  subtotal: number
  hasUnpriced: boolean
  open: boolean
  setOpen: (o: boolean) => void
  add: (productId: string, qty?: number, openPanel?: boolean) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartValue | null>(null)
const KEY = 'mq_cart'
const MAX_QTY = 99

function load(): CartLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    if (!Array.isArray(raw)) return []
    return raw.filter(
      (l): l is CartLine => typeof l?.productId === 'string' && Number.isInteger(l.qty) && l.qty > 0 && !!getProduct(l.productId),
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* ignore */
    }
  }, [lines])

  const add = useCallback((productId: string, qty = 1, openPanel = true) => {
    setLines((prev) => {
      const found = prev.find((l) => l.productId === productId)
      if (found) return prev.map((l) => (l.productId === productId ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
      return [...prev, { productId, qty: Math.min(MAX_QTY, qty) }]
    })
    if (openPanel) setOpen(true)
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    )
  }, [])

  const remove = useCallback((productId: string) => setLines((prev) => prev.filter((l) => l.productId !== productId)), [])
  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartValue>(() => {
    let subtotal = 0
    let hasUnpriced = false
    for (const l of lines) {
      const price = getProduct(l.productId)?.price
      if (price == null) hasUnpriced = true
      else subtotal += price * l.qty
    }
    return { lines, count: lines.reduce((n, l) => n + l.qty, 0), subtotal, hasUnpriced, open, setOpen, add, setQty, remove, clear }
  }, [lines, open, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
