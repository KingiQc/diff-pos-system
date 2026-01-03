import { useState, useEffect, useRef } from 'react';
import { Search, Barcode } from 'lucide-react';
import { products, searchProducts, getProductByBarcode, categories, Category } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { CartSidebar } from '@/components/pos/CartSidebar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const POS = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let result = products;

    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    setFilteredProducts(result);
  }, [searchQuery, activeCategory]);

  // Handle barcode scanner input
  const handleBarcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const barcode = (e.target as HTMLInputElement).value.trim();
      const product = getProductByBarcode(barcode);
      if (product) {
        setSearchQuery(product.name);
      }
      (e.target as HTMLInputElement).value = '';
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] -m-6">
      {/* Products Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search & Categories */}
        <div className="border-b border-border bg-background p-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="relative">
              <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={barcodeInputRef}
                type="text"
                placeholder="Scan barcode..."
                onKeyDown={handleBarcodeKeyDown}
                className="pl-10 w-48 rounded-xl"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              )}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2',
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredProducts.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  No products found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different search or category
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-96">
        <CartSidebar />
      </div>
    </div>
  );
};

export default POS;
