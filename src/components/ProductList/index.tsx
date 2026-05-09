import { Suspense } from 'react'
import getProducts from '@/app/actions/getProducts'
import Tile from '@/components/Tile'
import ProductGridPage from '@/components/ProductGridPage'
import PageSkeleton from '@/components/PageSkeleton'

type ProductListProps = {
  category: string
  page: number
  isLastPage: boolean
  maxPages: number
}

const ProductListInner = async ({ category, page, isLastPage, maxPages }: ProductListProps) => {
  const products = await getProducts(category, page)

  return (
    <ProductGridPage page={page} maxPages={maxPages} showTrigger={isLastPage}>
      {products.map((product) => (
        <Tile key={product.id} product={product} category={category} />
      ))}
    </ProductGridPage>
  )
}

const ProductList = (props: ProductListProps) => (
  <Suspense key={`page-${props.page}`} fallback={<PageSkeleton />}>
    <ProductListInner {...props} />
  </Suspense>
)

export default ProductList
