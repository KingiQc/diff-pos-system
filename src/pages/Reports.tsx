import { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const dailySales = [
  { day: 'Mon', sales: 450000, transactions: 28 },
  { day: 'Tue', sales: 380000, transactions: 22 },
  { day: 'Wed', sales: 520000, transactions: 35 },
  { day: 'Thu', sales: 410000, transactions: 26 },
  { day: 'Fri', sales: 680000, transactions: 42 },
  { day: 'Sat', sales: 890000, transactions: 58 },
  { day: 'Sun', sales: 320000, transactions: 18 },
];

const categoryData = [
  { name: 'Tops', value: 35, color: '#3b82f6' },
  { name: 'Shirts', value: 25, color: '#10b981' },
  { name: 'Pants', value: 18, color: '#f59e0b' },
  { name: 'Jeans', value: 12, color: '#8b5cf6' },
  { name: 'Bags', value: 6, color: '#ef4444' },
  { name: 'Caps', value: 4, color: '#06b6d4' },
];

const monthlyTrend = [
  { month: 'Sep', revenue: 8500000 },
  { month: 'Oct', revenue: 9200000 },
  { month: 'Nov', revenue: 11500000 },
  { month: 'Dec', revenue: 14800000 },
  { month: 'Jan', revenue: 12100000 },
];

const paymentMethods = [
  { method: 'Cash', count: 245, amount: 4500000 },
  { method: 'Bank Transfer', count: 156, amount: 3200000 },
  { method: 'POS', count: 89, amount: 1800000 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-01-03',
  });

  const totalWeeklySales = dailySales.reduce((sum, d) => sum + d.sales, 0);
  const totalTransactions = dailySales.reduce((sum, d) => sum + d.transactions, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and business insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="rounded-xl"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="rounded-xl"
            />
          </div>
          <Button className="rounded-xl gap-2">
            <Download className="h-5 w-5" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Weekly Revenue</p>
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatCurrency(totalWeeklySales)}
          </p>
          <p className="text-sm text-success mt-1">+12.5% from last week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {totalTransactions}
          </p>
          <p className="text-sm text-success mt-1">+8.2% from last week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <TrendingDown className="h-5 w-5 text-destructive" />
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatCurrency(Math.round(totalWeeklySales / totalTransactions))}
          </p>
          <p className="text-sm text-destructive mt-1">-3.1% from last week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Discounts</p>
            <span className="text-sm text-muted-foreground">7.5%</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-destructive">
            {formatCurrency(totalWeeklySales * 0.075)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">of total sales</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Daily Sales Chart */}
        <div className="col-span-2 rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Daily Sales This Week
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-muted-foreground" />
                <YAxis
                  tickFormatter={(value) =>
                    `₦${(value / 1000).toFixed(0)}k`
                  }
                  className="text-muted-foreground"
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Sales by Category
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 text-sm">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-muted-foreground">{cat.name}</span>
                <span className="ml-auto font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Monthly Revenue Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis
                  tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
                  className="text-muted-foreground"
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Payment Methods
          </h3>
          <div className="space-y-4">
            {paymentMethods.map((pm) => {
              const total = paymentMethods.reduce((s, p) => s + p.amount, 0);
              const percentage = Math.round((pm.amount / total) * 100);
              return (
                <div key={pm.method}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{pm.method}</p>
                      <p className="text-sm text-muted-foreground">
                        {pm.count} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {formatCurrency(pm.amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {percentage}%
                      </p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
