type CategoryConfig = {
  styles: string[]
  types: string[]
  image: string
  priceBase: number[]
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  bags: {
    styles: ['Leather', 'Canvas', 'Quilted', 'Woven', 'Studded', 'Embossed', 'Suede', 'Nylon'],
    types: [
      'Tote',
      'Crossbody',
      'Shoulder Bag',
      'Satchel',
      'Clutch',
      'Bucket Bag',
      'Hobo Bag',
      'Messenger',
      'Backpack',
      'Mini Bag',
      'Belt Bag',
      'Weekender',
      'Duffel',
      'Work Bag',
      'Travel Bag',
      'Pouch',
    ],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&auto=format',
    priceBase: [195, 295, 350, 245, 175, 325, 275, 395, 225, 450, 150, 375, 285, 315, 265, 425],
  },
  shoes: {
    styles: ['Leather', 'Canvas', 'Suede', 'Patent', 'Woven', 'Mesh', 'Knit', 'Satin'],
    types: [
      'Loafer',
      'Sneaker',
      'Boot',
      'Sandal',
      'Heel',
      'Flat',
      'Mule',
      'Oxford',
      'Derby',
      'Espadrille',
      'Slide',
      'Clog',
      'Pump',
      'Ankle Boot',
      'Chelsea Boot',
      'Platform',
    ],
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    priceBase: [165, 245, 395, 120, 285, 145, 195, 325, 310, 175, 95, 225, 275, 365, 345, 255],
  },
  new: {
    styles: ['Gold', 'Silver', 'Crystal', 'Enamel', 'Woven', 'Printed', 'Monogram', 'Signature'],
    types: [
      'Watch',
      'Sunglasses',
      'Scarf',
      'Hat',
      'Wallet',
      'Keychain',
      'Bracelet',
      'Ring',
      'Necklace',
      'Earrings',
      'Belt',
      'Gloves',
      'Umbrella',
      'Phone Case',
      'Card Holder',
      'Charm',
    ],
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    priceBase: [450, 275, 125, 95, 165, 65, 195, 225, 325, 185, 145, 175, 85, 55, 115, 75],
  },
  women: {
    styles: ['Silk', 'Cotton', 'Linen', 'Cashmere', 'Jersey', 'Denim', 'Wool', 'Velvet'],
    types: [
      'Dress',
      'Blouse',
      'Skirt',
      'Jacket',
      'Coat',
      'Cardigan',
      'Sweater',
      'Top',
      'Pants',
      'Jeans',
      'Jumpsuit',
      'Romper',
      'Vest',
      'Cape',
      'Blazer',
      'Tunic',
    ],
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop&auto=format',
    priceBase: [350, 195, 225, 495, 650, 275, 325, 145, 265, 185, 425, 295, 215, 575, 525, 175],
  },
}

function buildCatalog(categoryId: string, config: CategoryConfig): Product[] {
  const { styles, types, image, priceBase } = config
  return styles.flatMap((style, si) =>
    types.map((type, ti) => ({
      id: `${categoryId}-${(si * 16 + ti + 1).toString(16).padStart(4, '0')}`,
      name: `${style} ${type}`,
      image,
      price: priceBase[ti] + si * 20,
    }))
  )
}

const PRODUCTS_MOCK: Record<string, Product[]> = Object.fromEntries(
  Object.entries(CATEGORY_CONFIG).map(([id, config]) => [id, buildCatalog(id, config)])
)

export default PRODUCTS_MOCK
