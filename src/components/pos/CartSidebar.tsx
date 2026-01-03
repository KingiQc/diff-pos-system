import { useState } from 'react';
import { Trash2, Minus, Plus, CreditCard, Banknote, Smartphone, Percent } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

type PaymentMethod = 'cash' | 'transfer' | 'pos';

export const CartSidebar = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    discountPercent,
    setDiscountPercent,
    taxRate,
    taxAmount,
    total,
  } = useCart();

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [tempDiscount, setTempDiscount] = useState(discountPercent.toString());

  const handleApplyDiscount = () => {
    const disc = parseFloat(tempDiscount) || 0;
    if (disc >= 0 && disc <= 100) {
      setDiscountPercent(disc);
      setShowDiscount(false);
      toast.success(`${disc}% discount applied`);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    const received = parseFloat(amountReceived) || 0;
    
    if (paymentMethod === 'cash' && received < total) {
      toast.error('Insufficient amount received');
      return;
    }

    const change = paymentMethod === 'cash' ? received - total : 0;
    const receiptNo = `DIFF-${Date.now().toString(36).toUpperCase()}`;

    toast.success(
      <div className="space-y-1">
        <p className="font-bold">Sale Complete!</p>
        <p>Receipt: {receiptNo}</p>
        <p>Method: {paymentMethod.toUpperCase()}</p>
        {change > 0 && <p>Change: {formatCurrency(change)}</p>}
      </div>
    );

    clearCart();
    setShowPayment(false);
    setAmountReceived('');
  };

  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Current Sale</h2>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <p className="text-lg">Cart is empty</p>
            <p className="text-sm">Add products to start a sale</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-background p-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.size} / {item.color}
                    </p>
                    <p className="mt-1 font-bold text-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-lg bg-muted p-1 hover:bg-accent"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-lg bg-muted p-1 hover:bg-accent"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-bold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals & Actions */}
      <div className="border-t border-border p-4 space-y-4">
        {/* Discount Button */}
        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => setShowDiscount(true)}
        >
          <Percent className="mr-2 h-4 w-4" />
          {discountPercent > 0 ? `Discount: ${discountPercent}%` : 'Add Discount'}
        </Button>

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount ({discountPercent}%)</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT ({taxRate}%)</span>
            <span className="font-medium">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-foreground">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="w-full rounded-xl py-6 text-lg"
        >
          Checkout
        </Button>
      </div>

      {/* Discount Dialog */}
      <Dialog open={showDiscount} onOpenChange={setShowDiscount}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply Discount</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={tempDiscount}
                onChange={(e) => setTempDiscount(e.target.value)}
                placeholder="Enter discount percentage"
                className="rounded-xl"
              />
              <span className="text-lg font-medium">%</span>
            </div>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  onClick={() => setTempDiscount(val.toString())}
                  className="flex-1 rounded-xl"
                >
                  {val}%
                </Button>
              ))}
            </div>
            <Button onClick={handleApplyDiscount} className="w-full rounded-xl">
              Apply Discount
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Amount Due</p>
              <p className="text-3xl font-bold text-foreground">
                {formatCurrency(total)}
              </p>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${
                  paymentMethod === 'cash'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Banknote className="h-6 w-6" />
                <span className="text-sm font-medium">Cash</span>
              </button>
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${
                  paymentMethod === 'transfer'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Smartphone className="h-6 w-6" />
                <span className="text-sm font-medium">Transfer</span>
              </button>
              <button
                onClick={() => setPaymentMethod('pos')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${
                  paymentMethod === 'pos'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm font-medium">POS</span>
              </button>
            </div>

            {/* Amount Received (for cash) */}
            {paymentMethod === 'cash' && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Amount Received
                </label>
                <Input
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1 rounded-xl text-lg"
                />
                {parseFloat(amountReceived) > total && (
                  <p className="mt-2 text-sm text-success">
                    Change: {formatCurrency(parseFloat(amountReceived) - total)}
                  </p>
                )}
              </div>
            )}

            <Button onClick={handlePayment} className="w-full rounded-xl py-6 text-lg">
              Complete Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
