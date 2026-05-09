import { Children, ReactNode } from 'react'
import NextPageTrigger from '@/components/NextPageTrigger'
import { GRID_COLUMNS } from '@/constants'

type ProductGridPageProps = {
  children: ReactNode
  page: number
  maxPages: number
  showTrigger: boolean
}

const ROW_CLASS = 'col-span-full grid grid-cols-subgrid gap-y-4'

function chunk<T>(arr: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size))
  }
  return rows
}

const ProductGridPage = ({ children, page, maxPages, showTrigger }: ProductGridPageProps) => {
  const rows = chunk(Children.toArray(children), GRID_COLUMNS)

  return rows.map((row, i) => {
    const isLastRow = i === rows.length - 1

    if (showTrigger && isLastRow) {
      return (
        <NextPageTrigger key={`row-${page}-${i}`} page={page} maxPages={maxPages}>
          {row}
        </NextPageTrigger>
      )
    }

    return (
      <div key={`row-${page}-${i}`} className={ROW_CLASS}>
        {row}
      </div>
    )
  })
}

export default ProductGridPage
