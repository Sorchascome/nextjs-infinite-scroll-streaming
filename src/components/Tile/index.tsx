import Link from 'next/link'

type TileProps = {
  product: Product
  category: string
}

const Tile = ({ product, category }: TileProps) => {
  return (
    <Link
      href={`/${category}/${product.id}`}
      className="group bg-surface rounded-lg overflow-hidden border border-border transition-shadow hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
        <p className="text-sm text-muted mt-0.5">${product.price}</p>
      </div>
    </Link>
  )
}

export default Tile
