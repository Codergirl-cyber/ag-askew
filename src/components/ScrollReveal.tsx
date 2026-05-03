import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  /** Delay in ms before this element starts animating (for stagger) */
  delay?: number
  /** Distance to travel upward in px */
  distance?: number
  /** Duration of the animation in ms */
  duration?: number
  /** IntersectionObserver threshold (0-1) */
  threshold?: number
  /** If true, animate immediately on mount (for hero elements) */
  animateOnMount?: boolean
  /** Optional extra styles on the wrapper */
  style?: CSSProperties
  /** Optional className */
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  distance = 32,
  duration = 700,
  threshold = 0.25,
  animateOnMount = false,
  style,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (animateOnMount) {
      // Hero elements: trigger after a small mount delay
      const timeout = setTimeout(() => setIsVisible(true), delay + 100)
      return () => clearTimeout(timeout)
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animateOnMount, delay, threshold])

  return (
    <div ref={ref} className={className} style={style}>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          willChange: 'opacity, transform',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
