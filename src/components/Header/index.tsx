import getCategories from '@/app/actions/getCategories'
import Link from 'next/link'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          SHOP
        </Link>

        <nav className="flex gap-8">
          {categories.map(({ name, id }) => (
            <Link
              key={id}
              href={`/${id}`}
              prefetch={true}
              className="text-sm font-medium tracking-wide uppercase text-muted transition-colors hover:text-foreground"
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
