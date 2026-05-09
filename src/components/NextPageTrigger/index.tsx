'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ScrollTrigger from '@/components/ScrollTrigger'
import PageSkeleton from '@/components/PageSkeleton'

type NextPageTriggerProps = {
  page: number
  maxPages: number
  children: ReactNode
}

const NextPageTrigger = ({ page, maxPages, children }: NextPageTriggerProps) => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(false)
  }, [searchParams])

  return (
    <>
      <ScrollTrigger page={page} maxPages={maxPages} onTrigger={() => setLoading(true)}>
        {children}
      </ScrollTrigger>
      {loading && <PageSkeleton className="order-last" />}
    </>
  )
}

export default NextPageTrigger
