'use client'

import { ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useInView } from 'react-intersection-observer'

type ScrollTriggerProps = {
  page: number
  maxPages: number
  onTrigger?: () => void
  children: ReactNode
}

const ROW_CLASS = 'col-span-full grid grid-cols-subgrid gap-y-4'

const ScrollTrigger = ({ page, maxPages, onTrigger, children }: ScrollTriggerProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const { ref } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView && page < maxPages) {
        onTrigger?.()
        const params = new URLSearchParams(window.location.search)
        params.set('page', (page + 1).toString())
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      }
    },
  })

  if (page >= maxPages) return <div className={ROW_CLASS}>{children}</div>

  return (
    <div ref={ref} className={ROW_CLASS}>
      {children}
    </div>
  )
}

export default ScrollTrigger
