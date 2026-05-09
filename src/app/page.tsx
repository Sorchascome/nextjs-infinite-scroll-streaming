import Link from 'next/link'
import getCategories from '@/app/actions/getCategories'

export default async function Home() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-muted mt-1">Browse our collections</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(({ name, id }) => (
          <Link
            key={id}
            href={`/${id}`}
            prefetch={true}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-surface border border-border transition-shadow hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
