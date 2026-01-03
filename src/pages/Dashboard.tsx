import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/data/products';
import { CategorySection } from '@/components/products/CategorySection';
import { categories } from '@/data/products';

const stats = [
  {
    label: 'Today\'s Sales',
    value: 450000,
    change: 12.5,
    positive: true,
    icon: DollarSign,
  },
  {
    label: 'Total Orders',
    value: 28,
    change: 8.2,
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: 'Products Sold',
    value: 156,
    change: -3.1,
    positive: false,
    icon: Package,
  },
  {
    label: 'Active Customers',
    value: 42,
    change: 15.3,
    positive: true,
    icon: Users,
  },
];

const recentSales = [
  { id: 1, customer: 'Walk-in Customer', items: 3, total: 85000, time: '2 mins ago' },
  { id: 2, customer: 'Walk-in Customer', items: 1, total: 25000, time: '15 mins ago' },
  { id: 3, customer: 'Walk-in Customer', items: 5, total: 142000, time: '32 mins ago' },
  { id: 4, customer: 'Walk-in Customer', items: 2, total: 68000, time: '1 hour ago' },
];

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          {user?.branchName} • {new Date().toLocaleDateString('en-NG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Grid */}
      {isAdmin && (
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.positive ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">
                  {stat.label.includes('Sales')
                    ? formatCurrency(stat.value)
                    : stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Sales */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-lg font-bold text-foreground">Recent Sales</h2>
          </div>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-t border-border">
                    <td className="py-3 font-medium text-foreground">
                      {sale.customer}
                    </td>
                    <td className="py-3 text-muted-foreground">{sale.items}</td>
                    <td className="py-3 font-medium text-foreground">
                      {formatCurrency(sale.total)}
                    </td>
                    <td className="py-3 text-muted-foreground">{sale.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Overview</h2>
          <div className="space-y-4">
            <div className="rounded-xl bg-muted p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(2450000)}
                  </p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-muted p-4">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">1,248</p>
                  <p className="text-sm text-muted-foreground">
                    Products in Stock
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-muted p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Active Cashiers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h2>
        {categories.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat.id}
            title={cat.name}
            icon={cat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
