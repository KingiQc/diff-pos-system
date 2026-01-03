import { useState } from 'react';
import { Calendar, Download, Search, Eye, Printer } from 'lucide-react';
import { formatCurrency } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

interface Sale {
  id: string;
  receiptNo: string;
  items: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'pos';
  cashier: string;
  cashierId: string;
  date: string;
  time: string;
}

const mockSales: Sale[] = [
  {
    id: '1',
    receiptNo: 'DIFF-ABC123',
    items: 3,
    subtotal: 95000,
    discount: 5000,
    tax: 6750,
    total: 96750,
    paymentMethod: 'cash',
    cashier: 'Jane Cashier',
    cashierId: '2',
    date: '2025-01-03',
    time: '14:32',
  },
  {
    id: '2',
    receiptNo: 'DIFF-DEF456',
    items: 1,
    subtotal: 35000,
    discount: 0,
    tax: 2625,
    total: 37625,
    paymentMethod: 'transfer',
    cashier: 'Jane Cashier',
    cashierId: '2',
    date: '2025-01-03',
    time: '13:15',
  },
  {
    id: '3',
    receiptNo: 'DIFF-GHI789',
    items: 5,
    subtotal: 180000,
    discount: 18000,
    tax: 12150,
    total: 174150,
    paymentMethod: 'pos',
    cashier: 'John Smith',
    cashierId: '3',
    date: '2025-01-03',
    time: '11:45',
  },
  {
    id: '4',
    receiptNo: 'DIFF-JKL012',
    items: 2,
    subtotal: 55000,
    discount: 0,
    tax: 4125,
    total: 59125,
    paymentMethod: 'cash',
    cashier: 'Jane Cashier',
    cashierId: '2',
    date: '2025-01-02',
    time: '16:20',
  },
];

const Sales = () => {
  const { isAdmin, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [dateFilter, setDateFilter] = useState('');

  // Filter sales based on role
  const filteredSales = mockSales.filter((sale) => {
    const matchesSearch =
      sale.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.cashier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !dateFilter || sale.date === dateFilter;
    const matchesUser = isAdmin || sale.cashierId === user?.id;
    return matchesSearch && matchesDate && matchesUser;
  });

  // Calculate totals
  const totalSales = filteredSales.reduce((sum, s) => sum + s.total, 0);
  const totalDiscount = filteredSales.reduce((sum, s) => sum + s.discount, 0);
  const totalTax = filteredSales.reduce((sum, s) => sum + s.tax, 0);

  const handleExportCSV = () => {
    const headers = ['Receipt No', 'Items', 'Subtotal', 'Discount', 'Tax', 'Total', 'Payment', 'Cashier', 'Date', 'Time'];
    const rows = filteredSales.map((s) => [
      s.receiptNo,
      s.items,
      s.subtotal,
      s.discount,
      s.tax,
      s.total,
      s.paymentMethod,
      s.cashier,
      s.date,
      s.time,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((row) => row.join(',')).join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `sales_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales History</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'View all sales transactions' : 'Your sales transactions'}
          </p>
        </div>
        <Button onClick={handleExportCSV} className="rounded-xl gap-2">
          <Download className="h-5 w-5" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatCurrency(totalSales)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredSales.length} transactions
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Discounts</p>
          <p className="mt-2 text-3xl font-bold text-destructive">
            -{formatCurrency(totalDiscount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Tax (VAT)</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatCurrency(totalTax)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by receipt or cashier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10 rounded-xl w-48"
          />
        </div>
      </div>

      {/* Sales Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="p-4">Receipt No</th>
              <th className="p-4">Items</th>
              <th className="p-4">Subtotal</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Tax</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              {isAdmin && <th className="p-4">Cashier</th>}
              <th className="p-4">Date & Time</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="border-t border-border">
                <td className="p-4 font-mono text-sm text-foreground">
                  {sale.receiptNo}
                </td>
                <td className="p-4 text-foreground">{sale.items}</td>
                <td className="p-4 text-foreground">
                  {formatCurrency(sale.subtotal)}
                </td>
                <td className="p-4 text-destructive">
                  {sale.discount > 0 ? `-${formatCurrency(sale.discount)}` : '-'}
                </td>
                <td className="p-4 text-muted-foreground">
                  {formatCurrency(sale.tax)}
                </td>
                <td className="p-4 font-bold text-foreground">
                  {formatCurrency(sale.total)}
                </td>
                <td className="p-4">
                  <span className="rounded-lg bg-muted px-2 py-1 text-xs font-medium capitalize">
                    {sale.paymentMethod}
                  </span>
                </td>
                {isAdmin && (
                  <td className="p-4 text-muted-foreground">{sale.cashier}</td>
                )}
                <td className="p-4 text-muted-foreground">
                  {sale.date} {sale.time}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg"
                      onClick={() => setSelectedSale(sale)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sale Details Dialog */}
      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sale Details</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">Receipt Number</p>
                <p className="text-xl font-bold font-mono">
                  {selectedSale.receiptNo}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedSale.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedSale.time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cashier</p>
                  <p className="font-medium">{selectedSale.cashier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize">
                    {selectedSale.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(selectedSale.subtotal)}</span>
                </div>
                {selectedSale.discount > 0 && (
                  <div className="flex justify-between text-destructive">
                    <span>Discount</span>
                    <span>-{formatCurrency(selectedSale.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (7.5%)</span>
                  <span>{formatCurrency(selectedSale.tax)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(selectedSale.total)}
                  </span>
                </div>
              </div>
              <Button className="w-full rounded-xl">
                <Printer className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;
