import { notFound } from 'next/navigation'
import Link from 'next/link'
import getProduct from '@/app/actions/getProduct'
import PRODUCTS_MOCK from '@/mocks/products'

type ProductPageProps = {
  params: Promise<{ category: string; productId: string }>
}

export async function generateStaticParams() {
  return Object.entries(PRODUCTS_MOCK).flatMap(([category, products]) =>
    products.map((product) => ({ category, productId: product.id }))
  )
}

export default async function ProductPage(props: ProductPageProps) {
  const { category, productId } = await props.params
  return <CachedProductPage category={category} productId={productId} />
}

async function CachedProductPage({
  category,
  productId,
}: {
  category: string
  productId: string
}) {
  'use cache'
  const product = await getProduct(category, productId)

  if (!product) notFound()

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-6">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-foreground transition-colors">
          {categoryTitle}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-2xl text-muted mt-2">${product.price}</p>

          <p className="text-sm text-muted mt-6 leading-relaxed">
            Crafted with premium materials, the {product.name} combines timeless
            design with everyday functionality. A versatile addition to any
            wardrobe.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="h-12 px-8 rounded-lg bg-foreground text-background text-sm font-medium transition-opacity hover:opacity-90">
              Add to Bag
            </button>
            <button className="h-12 px-8 rounded-lg border border-border text-sm font-medium transition-colors hover:bg-gray-50">
              Save to Wishlist
            </button>
          </div>

          <div className="mt-10 border-t border-border pt-6 space-y-3 text-sm text-muted">
            <p>Free shipping on orders over $150</p>
            <p>Free returns within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
