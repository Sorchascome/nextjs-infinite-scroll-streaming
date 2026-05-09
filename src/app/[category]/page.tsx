import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import getProducts from '@/app/actions/getProducts'
import getCategories from '@/app/actions/getCategories'
import Tile from '@/components/Tile'
import ProductList from '@/components/ProductList'
import ProductGridPage from '@/components/ProductGridPage'
import { MAX_PAGES, ALL_PAGES, INITIAL_PAGE, PAGE_SIZE } from '@/constants'

type CategoryPageProps = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(({ id }) => ({ category: id }))
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { category } = await props.params

  return (
    <div className="max-w-7xl mx-auto px-6">
      <CachedPageHeader category={category} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <CachedInitialProducts category={category} />

        <Suspense>
          <SubsequentPages category={category} searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

async function CachedPageHeader({ category }: { category: string }) {
  'use cache'
  cacheLife('hours')
  const title = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="flex items-baseline justify-between mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted">{PAGE_SIZE * MAX_PAGES} products</p>
    </div>
  )
}

async function CachedInitialProducts({ category }: { category: string }) {
  'use cache'
  cacheLife('hours')
  const products = await getProducts(category, INITIAL_PAGE)

  return (
    <ProductGridPage page={INITIAL_PAGE} maxPages={MAX_PAGES} showTrigger>
      {products.map((product) => (
        <Tile key={product.id} product={product} category={category} />
      ))}
    </ProductGridPage>
  )
}

async function SubsequentPages({
  category,
  searchParams,
}: {
  category: string
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), MAX_PAGES)
  const subsequentPages = ALL_PAGES.slice(INITIAL_PAGE, currentPage)

  return subsequentPages.map((pageNum) => (
    <ProductList
      key={`page-${pageNum}`}
      category={category}
      page={pageNum}
      isLastPage={pageNum === currentPage}
      maxPages={MAX_PAGES}
    />
  ))
}
