

export function StatsCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-metal tracking-wider">{title}</p>
          <p className="text-2xl font-metal mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-black text-white rounded-lg">
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

