import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import { StatsCard } from '../../components/stats-card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="font-metal text-2xl tracking-wider">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="TOTAL REVENUE"
          value="$45,231"
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="TOTAL ORDERS"
          value="356"
          icon={ShoppingBag}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="TOTAL CUSTOMERS"
          value="2,345"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="GROWTH RATE"
          value="23%"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="font-metal text-lg tracking-wider mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="font-metal tracking-wider">New order #1234</p>
                <p className="text-sm text-gray-600">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

