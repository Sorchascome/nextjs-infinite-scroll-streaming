import { PAGE_SIZE } from '@/constants'

type PageSkeletonProps = {
  className?: string
}

const PageSkeleton = ({ className }: PageSkeletonProps) => (
  <>
    {Array.from({ length: PAGE_SIZE }, (_, i) => (
      <div
        key={`loading-${i}`}
        className={`bg-surface rounded-lg overflow-hidden border border-border ${className ?? ''}`}
      >
        <div className="aspect-square bg-gray-100 animate-pulse" />
        <div className="p-3 space-y-2">
          <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded" />
          <div className="h-4 w-1/4 bg-gray-100 animate-pulse rounded" />
        </div>
      </div>
    ))}
  </>
)

export default PageSkeleton
