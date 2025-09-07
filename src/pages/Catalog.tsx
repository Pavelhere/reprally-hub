import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/credit';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const { products, cart, getCartTotal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Snacks', 'Beverages', 'Health'];
  const cartTotal = getCartTotal();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.active;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border-secondary px-4 pt-12 pb-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-text-primary">Catalog</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={18} />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pill bg-surface-secondary border-border-secondary"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            >
              <Filter size={18} className="text-text-muted" />
            </Button>
          </div>
          
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`pill whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-brand-600 text-white'
                    : 'border-brand-600 text-brand-600 hover:bg-brand-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
            <p className="text-text-secondary">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <Link to="/cart">
          <div className="fixed bottom-20 right-4 z-50">
            <Button className="h-14 w-14 rounded-full bg-brand-600 hover:bg-brand-700 shadow-lg">
              <div className="relative">
                <ShoppingCart size={20} className="text-white" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-danger text-white rounded-full p-0 flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              </div>
            </Button>
          </div>
        </Link>
      )}

      <BottomNav />
    </div>
  );
}