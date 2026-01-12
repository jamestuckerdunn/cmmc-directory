import { Skeleton } from '@/components/ui/Skeleton'
import { Card } from '@/components/ui/Card'

export default function DirectoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        </div>

        {/* Company list skeleton */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2 mt-3">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {/* Pagination skeleton */}
          <div className="flex justify-center mt-8 gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}
