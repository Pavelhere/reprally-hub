import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/credit';
import { BRANDS } from '@/lib/seed-data';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, products, getCartTotal, getCartByBrand, updateCartQty } = useAppStore();
  const [discountEnabled, setDiscountEnabled] = useState(false);
  
  const cartTotal = getCartTotal();
  const discountAmount = discountEnabled ? Math.floor(cartTotal * 0.2) : 0;
  const finalTotal = cartTotal - discountAmount;
  
  const cartByBrand = getCartByBrand();
  
  const getBrandName = (brandId: string) => {
    return BRANDS.find(b => b.id === brandId)?.name || 'Unknown Brand';
  };
  
  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const getBrandSubtotal = (brandId: string, items: typeof cart) => {
    return items.reduce((total, item) => {
      const product = getProduct(item.product_id);
      return total + (product?.price_cents || 0) * item.qty;
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="text-6xl">🛒</div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-text-primary">Your cart is empty</h2>
            <p className="text-text-secondary">Add some products to get started</p>
          </div>
          <Link to="/catalog">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white pill">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-surface border-b border-border-secondary px-4 pt-12 pb-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={20} className="text-text-primary" />
          </button>
          <h1 className="text-xl font-bold text-text-primary">Cart</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-6">
        {/* Brand Groups */}
        {Object.entries(cartByBrand).map(([brandId, items]) => (
          <Card key={brandId} className="p-4 border border-border-secondary">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="pill bg-brand-100 text-brand-700">
                  {getBrandName(brandId)}
                </Badge>
                <span className="text-sm font-semibold text-text-primary">
                  {formatCurrency(getBrandSubtotal(brandId, items))}
                </span>
              </div>
              
              <div className="space-y-3">
                {items.map((item) => {
                  const product = getProduct(item.product_id);
                  if (!product) return null;
                  
                  return (
                    <div key={item.product_id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-start rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-lg">📦</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-text-primary">
                          {product.name}
                        </h4>
                        <p className="text-xs text-text-muted">{product.case_size}</p>
                        <p className="text-sm font-bold text-text-primary">
                          {formatCurrency(product.price_cents)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-brand-600 text-brand-600"
                          onClick={() => updateCartQty(item.product_id, item.qty - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-brand-600 text-brand-600"
                          onClick={() => updateCartQty(item.product_id, item.qty + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}

        {/* Discounts */}
        <Card className="p-4 border border-border-secondary">
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">Discounts</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-text-primary">20% Brand Promo (Intro Discount)</p>
                <p className="text-sm text-text-secondary">20% off</p>
              </div>
              <Switch
                checked={discountEnabled}
                onCheckedChange={setDiscountEnabled}
              />
            </div>
          </div>
        </Card>

        {/* Totals */}
        <Card className="p-4 border border-border-secondary">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Subtotal:</span>
              <span className="font-semibold text-text-primary">
                {formatCurrency(cartTotal)}
              </span>
            </div>
            {discountEnabled && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Discounts:</span>
                <span className="font-semibold text-success">
                  -{formatCurrency(discountAmount)}
                </span>
              </div>
            )}
            <div className="border-t pt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-text-primary">Total:</span>
              <span className="text-lg font-bold text-text-primary">
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-secondary p-4">
        <div className="max-w-md mx-auto">
          <Link to="/checkout">
            <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white pill h-14 text-lg font-semibold">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}