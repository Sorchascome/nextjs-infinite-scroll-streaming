'use server'

import { cacheLife } from 'next/cache'
import PRODUCTS_MOCK from '@/mocks/products'

export default async function getProduct(
  category: string,
  productId: string,
): Promise<Product | null> {
  'use cache'
  cacheLife('hours')
  await new Promise((resolve) => setTimeout(resolve, 800))
  const catalog = PRODUCTS_MOCK[category] ?? []
  return catalog.find((p) => p.id === productId) ?? null
}
