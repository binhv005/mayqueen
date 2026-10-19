import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'

export type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'fade'

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  variant?: RevealVariant
  /** delay in ms, use it to stagger siblings */
  delay?: number
}

/** Animates children in once when they scroll into view (CSS disables it for reduced-motion users). */
export function Reveal({ children, as: Tag = 'div', className = '', variant = 'up', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${seen ? ' is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
