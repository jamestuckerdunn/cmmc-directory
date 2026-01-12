import { Skeleton } from '@/components/ui/Skeleton'
import { Card } from '@/components/ui/Card'

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="h-4 w-24 mb-2 bg-white/20" />
            <Skeleton className="h-10 w-48 mb-2 bg-white/20" />
            <Skeleton className="h-5 w-72 bg-white/20" />
          </div>
          <Skeleton className="h-10 w-40 mt-4 md:mt-0 bg-white/20" />
        </div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="w-14 h-14 rounded-xl" />
            </div>
          </Card>
        ))}
      </div>

      {/* Main content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center p-3 rounded-lg bg-gray-50">
                  <Skeleton className="w-10 h-10 rounded-lg mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
