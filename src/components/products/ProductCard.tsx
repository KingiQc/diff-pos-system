import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product, formatCurrency } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    });
    setQuantity(1);
    setShowOptions(false);
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg',
        compact ? 'p-3' : 'p-4'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {product.stock < 10 && (
          <span className="absolute right-2 top-2 rounded-lg bg-warning px-2 py-1 text-xs font-medium text-warning-foreground">
            Low Stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className={cn('mt-3', compact ? 'space-y-1' : 'space-y-2')}>
        <h3 className={cn('font-medium text-foreground line-clamp-1', compact ? 'text-sm' : 'text-base')}>
          {product.name}
        </h3>
        <p className={cn('font-bold text-foreground', compact ? 'text-base' : 'text-lg')}>
          {formatCurrency(product.price)}
        </p>
        <p className="text-xs text-muted-foreground">
          Stock: {product.stock}
        </p>
      </div>

      {/* Quick Add / Options Toggle */}
      {!showOptions ? (
        <Button
          onClick={() => setShowOptions(true)}
          className="mt-3 w-full rounded-xl"
          size={compact ? 'sm' : 'default'}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      ) : (
        <div className="mt-3 space-y-3 animate-fade-in">
          {/* Size Selection */}
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">Size</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'rounded-lg px-2 py-1 text-xs font-medium transition-colors',
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">Color</p>
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'rounded-lg px-2 py-1 text-xs font-medium transition-colors',
                    selectedColor === color
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Qty</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-lg bg-muted p-1 hover:bg-accent"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-lg bg-muted p-1 hover:bg-accent"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOptions(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="flex-1 rounded-xl"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
