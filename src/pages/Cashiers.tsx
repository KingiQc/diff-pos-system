import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Ban, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { formatCurrency } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Cashier {
  id: string;
  name: string;
  email: string;
  branchId: string;
  branchName: string;
  isActive: boolean;
  totalSales: number;
  totalTransactions: number;
  totalDiscount: number;
  totalTax: number;
  createdAt: string;
}

const mockCashiers: Cashier[] = [
  {
    id: '2',
    name: 'Jane Cashier',
    email: 'cashier@diff.ng',
    branchId: 'branch-1',
    branchName: 'Diff Lagos - Lekki',
    isActive: true,
    totalSales: 2450000,
    totalTransactions: 156,
    totalDiscount: 122500,
    totalTax: 174562,
    createdAt: '2024-10-15',
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john@diff.ng',
    branchId: 'branch-1',
    branchName: 'Diff Lagos - Lekki',
    isActive: true,
    totalSales: 1890000,
    totalTransactions: 124,
    totalDiscount: 94500,
    totalTax: 134775,
    createdAt: '2024-11-20',
  },
  {
    id: '4',
    name: 'Mary Johnson',
    email: 'mary@diff.ng',
    branchId: 'branch-2',
    branchName: 'Diff Lagos - VI',
    isActive: false,
    totalSales: 890000,
    totalTransactions: 67,
    totalDiscount: 44500,
    totalTax: 63562,
    createdAt: '2024-09-05',
  },
];

const Cashiers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCashier, setSelectedCashier] = useState<Cashier | null>(null);

  const [newCashier, setNewCashier] = useState({
    name: '',
    email: '',
    password: '',
    branchId: 'branch-1',
  });

  const filteredCashiers = mockCashiers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCashier = () => {
    if (!newCashier.name || !newCashier.email || !newCashier.password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Cashier account created successfully');
    setShowAddDialog(false);
    setNewCashier({ name: '', email: '', password: '', branchId: 'branch-1' });
  };

  const handleToggleStatus = (cashier: Cashier) => {
    const action = cashier.isActive ? 'suspended' : 'activated';
    toast.success(`${cashier.name} has been ${action}`);
  };

  const handleDeleteCashier = (cashier: Cashier) => {
    toast.success(`${cashier.name}'s account has been deleted`);
  };

  // Calculate totals
  const totalSales = mockCashiers.reduce((sum, c) => sum + c.totalSales, 0);
  const totalDiscount = mockCashiers.reduce((sum, c) => sum + c.totalDiscount, 0);
  const totalTax = mockCashiers.reduce((sum, c) => sum + c.totalTax, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cashiers</h1>
          <p className="text-muted-foreground">Manage cashier accounts</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2">
              <Plus className="h-5 w-5" />
              Add Cashier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Cashier Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={newCashier.name}
                  onChange={(e) =>
                    setNewCashier({ ...newCashier, name: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={newCashier.email}
                  onChange={(e) =>
                    setNewCashier({ ...newCashier, email: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="cashier@diff.ng"
                />
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={newCashier.password}
                    onChange={(e) =>
                      setNewCashier({ ...newCashier, password: e.target.value })
                    }
                    className="mt-1 rounded-xl pr-10"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button onClick={handleAddCashier} className="rounded-xl">
                Create Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Cashiers</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {mockCashiers.length}
          </p>
          <p className="text-sm text-success mt-1">
            {mockCashiers.filter((c) => c.isActive).length} active
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Combined Sales</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatCurrency(totalSales)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Discounts</p>
          <p className="mt-2 text-3xl font-bold text-destructive">
            -{formatCurrency(totalDiscount)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Tax</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatCurrency(totalTax)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search cashiers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Cashiers Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="p-4">Cashier</th>
              <th className="p-4">Branch</th>
              <th className="p-4">Total Sales</th>
              <th className="p-4">Transactions</th>
              <th className="p-4">Discounts</th>
              <th className="p-4">Tax</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCashiers.map((cashier) => (
              <tr key={cashier.id} className="border-t border-border">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{cashier.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cashier.email}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{cashier.branchName}</td>
                <td className="p-4 font-bold text-foreground">
                  {formatCurrency(cashier.totalSales)}
                </td>
                <td className="p-4 text-foreground">
                  {cashier.totalTransactions}
                </td>
                <td className="p-4 text-destructive">
                  {formatCurrency(cashier.totalDiscount)}
                </td>
                <td className="p-4 text-muted-foreground">
                  {formatCurrency(cashier.totalTax)}
                </td>
                <td className="p-4">
                  <span
                    className={cn(
                      'rounded-lg px-2 py-1 text-xs font-medium',
                      cashier.isActive
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    )}
                  >
                    {cashier.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg"
                      onClick={() => setSelectedCashier(cashier)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'rounded-lg',
                        cashier.isActive
                          ? 'text-warning hover:text-warning'
                          : 'text-success hover:text-success'
                      )}
                      onClick={() => handleToggleStatus(cashier)}
                    >
                      {cashier.isActive ? (
                        <Ban className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg text-destructive hover:text-destructive"
                      onClick={() => handleDeleteCashier(cashier)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cashier Details Dialog */}
      <Dialog open={!!selectedCashier} onOpenChange={() => setSelectedCashier(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cashier Details</DialogTitle>
          </DialogHeader>
          {selectedCashier && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {selectedCashier.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold">{selectedCashier.name}</p>
                  <p className="text-muted-foreground">{selectedCashier.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-muted-foreground">Total Sales</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(selectedCashier.totalSales)}
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-muted-foreground">Transactions</p>
                  <p className="text-xl font-bold">
                    {selectedCashier.totalTransactions}
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-muted-foreground">Discounts Given</p>
                  <p className="text-xl font-bold text-destructive">
                    {formatCurrency(selectedCashier.totalDiscount)}
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-muted-foreground">Tax Collected</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(selectedCashier.totalTax)}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Branch: {selectedCashier.branchName}</p>
                <p>Member since: {selectedCashier.createdAt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cashiers;
