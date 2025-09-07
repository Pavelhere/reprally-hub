import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/credit';
import { useAppStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  initialQty?: number;
  onAddToCart?: (qty: number) => void;
}

export default function ProductCard({ product, initialQty = 0, onAddToCart }: ProductCardProps) {
  const [qty, setQty] = useState(initialQty);
  const { addToCart, updateCartQty } = useAppStore();

  const handleQtyChange = (newQty: number) => {
    const finalQty = Math.max(0, newQty);
    setQty(finalQty);
    
    if (finalQty > 0) {
      updateCartQty(product.id, finalQty);
    } else {
      updateCartQty(product.id, 0);
    }
  };

  const handleAddToCart = () => {
    if (qty > 0) {
      addToCart(product.id, qty);
      if (onAddToCart) {
        onAddToCart(qty);
      }
    }
  };

  return (
    <Card className="p-4 space-y-3 border border-border-secondary hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 bg-gradient-start rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl">📦</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-text-primary text-sm leading-tight">
            {product.name}
          </h4>
          <p className="text-xs text-text-muted mt-1">{product.case_size}</p>
          <p className="text-sm font-bold text-text-primary mt-1">
            {formatCurrency(product.price_cents)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-brand-600 text-brand-600 hover:bg-brand-50"
            onClick={() => handleQtyChange(qty - 1)}
            disabled={qty <= 0}
          >
            <Minus size={14} />
          </Button>
          
          <span className="w-8 text-center text-sm font-semibold text-text-primary">
            {qty}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-brand-600 text-brand-600 hover:bg-brand-50"
            onClick={() => handleQtyChange(qty + 1)}
          >
            <Plus size={14} />
          </Button>
        </div>
        
        {qty > 0 && (
          <Button
            size="sm"
            className="bg-brand-600 hover:bg-brand-700 text-white pill px-4"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        )}
      </div>
    </Card>
  );
}