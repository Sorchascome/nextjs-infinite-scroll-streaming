'use server'

import { cacheLife } from 'next/cache'
import PRODUCTS_MOCK from '@/mocks/products'
import { PAGE_SIZE } from '@/constants'

export default async function getProducts(category: string, page: number): Promise<Product[]> {
  'use cache'
  cacheLife('hours')
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const catalog = PRODUCTS_MOCK[category] ?? []
  return catalog.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
}
