export default function Loading() {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Page Title Skeleton */}
        <div>
          <div className="h-8 bg-gray-200 w-48 rounded" />
          <div className="h-4 bg-gray-200 w-64 mt-1 rounded" />
        </div>
  
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 w-24 rounded" />
                  <div className="h-6 bg-gray-200 w-16 rounded" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
  
        {/* Recent Activity Skeleton */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="h-6 bg-gray-200 w-32 rounded mb-4" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 w-48 rounded" />
                  <div className="h-3 bg-gray-200 w-24 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  