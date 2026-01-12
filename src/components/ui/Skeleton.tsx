import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded', className)} />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-3 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="w-16 h-5 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="w-full h-3 bg-gray-200 rounded" />
        <div className="w-4/5 h-3 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-20 h-5 bg-gray-200 rounded-full" />
        <div className="w-16 h-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="w-40 h-4 bg-gray-200 rounded" />
          <div className="w-24 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-20 h-6 bg-gray-200 rounded-full" />
    </div>
  )
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="w-24 h-3 bg-gray-200 rounded" />
          <div className="w-16 h-8 bg-gray-200 rounded" />
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="w-32 h-6 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-full h-10 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-full h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="w-24 h-6 bg-gray-200 rounded mb-6" />
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-full h-10 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-full h-20 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="animate-pulse mb-8">
      <div className="w-48 h-8 bg-gray-200 rounded mb-2" />
      <div className="w-64 h-4 bg-gray-200 rounded" />
    </div>
  )
}
