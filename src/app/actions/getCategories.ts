'use server'

import { cacheLife } from 'next/cache'

const MOCK_CATEGORIES = [
  { name: 'Bags', id: 'bags' },
  { name: 'Shoes', id: 'shoes' },
  { name: 'New', id: 'new' },
  { name: 'Women', id: 'women' },
]

export default async function getCategories(): Promise<Category[]> {
  'use cache'
  cacheLife('days')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CATEGORIES)
    }, 2000)
  })
}
