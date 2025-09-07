import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, ScanBarcode } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import CreditCard from '@/components/CreditCard';
import ProductCard from '@/components/ProductCard';
import ComingSoonModal from '@/components/ComingSoonModal';
import { useAppStore } from '@/lib/store';
import { REORDER_PRODUCTS, ORDER_GUIDE_PRODUCTS } from '@/lib/seed-data';
import { Link } from 'react-router-dom';

export default function Home() {
  const { products, currentStore } = useAppStore();
  const [comingSoonModal, setComingSoonModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({ isOpen: false, title: '', description: '' });

  const reorderProducts = products.filter(p => REORDER_PRODUCTS.includes(p.id));
  const orderGuideProducts = products.filter(p => ORDER_GUIDE_PRODUCTS.includes(p.id));

  const openComingSoon = (title: string, description: string) => {
    setComingSoonModal({ isOpen: true, title, description });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="hero-gradient px-4 pt-12 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Good morning!
              </h1>
              <p className="text-text-secondary">{currentStore.name}</p>
            </div>
            <button 
              onClick={() => openComingSoon('Scan to reorder', 'quickly scan barcodes to reorder your favorite products')}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ScanBarcode size={20} className="text-white" />
            </button>
          </div>
          
          <CreditCard />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-8">
        {/* New Order CTA */}
        <Link to="/catalog">
          <Card className="p-4 border-2 border-dashed border-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-brand-700">Start a new order</h3>
                <p className="text-sm text-brand-600">Browse our full catalog</p>
              </div>
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                <Plus size={20} className="text-white" />
              </div>
            </div>
          </Card>
        </Link>

        {/* Reorder Last */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Reorder Last</h2>
            <Button variant="ghost" size="sm" className="text-brand-600">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {reorderProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Order Guide */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Order Guide</h2>
            <Button variant="ghost" size="sm" className="text-brand-600">
              Customize
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {orderGuideProducts.map((product) => (
              <div key={product.id} className="space-y-2">
                <Card className="p-3 text-center border border-brand-600 bg-brand-50">
                  <div className="w-12 h-12 bg-gradient-start rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <h4 className="font-semibold text-sm text-text-primary">
                    {product.name}
                  </h4>
                  <p className="text-xs text-text-muted">{product.case_size}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">More Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openComingSoon('Assortment recommendations', 'get AI-powered suggestions based on stores like yours')}
              className="p-4 bg-surface rounded-card border border-border-secondary text-left hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm">Recommendations</h4>
            </button>
            
            <button
              onClick={() => openComingSoon('Standing orders', 'set up automatic recurring orders for your best sellers')}
              className="p-4 bg-surface rounded-card border border-border-secondary text-left hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-semibold text-sm">Auto Orders</h4>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
      
      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal(prev => ({ ...prev, isOpen: false }))}
        title={comingSoonModal.title}
        description={comingSoonModal.description}
      />
    </div>
  );
}