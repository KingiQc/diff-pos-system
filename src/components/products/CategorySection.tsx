import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Category, getProductsByCategory } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

interface CategorySectionProps {
  category: Category;
  title: string;
  icon: string;
}

export const CategorySection = ({ category, title, icon }: CategorySectionProps) => {
  const products = getProductsByCategory(category).slice(0, 6);

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
        <Link to={`/products?category=${category}`}>
          <Button variant="ghost" className="gap-1 rounded-xl">
            See More
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </section>
  );
};
