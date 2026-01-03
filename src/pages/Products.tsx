import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Upload } from 'lucide-react';
import { products, categories, Category, formatCurrency } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(
    categoryParam || 'all'
  );
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '' as Category,
    price: '',
    barcode: '',
    sizes: '',
    colors: '',
    stock: '',
    image: '',
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Product added successfully');
    setShowAddDialog(false);
    setNewProduct({
      name: '',
      category: '' as Category,
      price: '',
      barcode: '',
      sizes: '',
      colors: '',
      stock: '',
      image: '',
    });
  };

  const handleDeleteProduct = (id: string, name: string) => {
    toast.success(`${name} deleted successfully`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your inventory</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2">
              <Plus className="h-5 w-5" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2">
                <Label>Product Image</Label>
                <div className="mt-2 flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 hover:border-primary/50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Label>Product Name *</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label>Category *</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(val) =>
                    setNewProduct({ ...newProduct, category: val as Category })
                  }
                >
                  <SelectTrigger className="mt-1 rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price (₦) *</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Barcode</Label>
                <Input
                  value={newProduct.barcode}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, barcode: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="SKU or barcode"
                />
              </div>
              <div>
                <Label>Sizes (comma separated)</Label>
                <Input
                  value={newProduct.sizes}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sizes: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="S, M, L, XL"
                />
              </div>
              <div>
                <Label>Colors (comma separated)</Label>
                <Input
                  value={newProduct.colors}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, colors: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="Black, White, Navy"
                />
              </div>
              <div>
                <Label>Total Stock</Label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                  placeholder="0"
                />
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
              <Button onClick={handleAddProduct} className="rounded-xl">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
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
      </div>

      {/* Category Tabs */}
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
          All ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
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
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Sizes</th>
              <th className="p-4">Colors</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.barcode}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="rounded-lg bg-muted px-2 py-1 text-xs font-medium capitalize">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 font-medium text-foreground">
                  {formatCurrency(product.price)}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="rounded bg-muted px-1.5 py-0.5 text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="rounded bg-muted px-1.5 py-0.5 text-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={cn(
                      'rounded-lg px-2 py-1 text-xs font-medium',
                      product.stock < 10
                        ? 'bg-destructive/10 text-destructive'
                        : product.stock < 30
                        ? 'bg-warning/10 text-warning'
                        : 'bg-success/10 text-success'
                    )}
                  >
                    {product.stock} units
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg text-destructive hover:text-destructive"
                      onClick={() =>
                        handleDeleteProduct(product.id, product.name)
                      }
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
    </div>
  );
};

export default Products;
