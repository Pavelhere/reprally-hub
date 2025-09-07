import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Truck, FileText } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/credit';
import { BRANDS } from '@/lib/seed-data';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const paymentType = searchParams.get('payment') || 'paid';
  const { currentRep } = useAppStore();
  
  const orderNumber = `#RR${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  useEffect(() => {
    // Log analytics event
    console.log('order_confirmed', { payment_type: paymentType, order_id: orderNumber });
  }, [paymentType, orderNumber]);

  return (
    <div className="min-h-screen bg-background">
      {/* Success Hero */}
      <div className="hero-gradient px-4 pt-16 pb-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
            <Check size={32} className="text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">Order Confirmed!</h1>
            <p className="text-text-secondary">
              {paymentType === 'paid' ? 'Payment processed successfully' : 'Invoice created successfully'}
            </p>
          </div>
          
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-white/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Order Number:</span>
                <span className="font-mono font-semibold text-brand-600">{orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Status:</span>
                <Badge className={`pill ${
                  paymentType === 'paid' ? 'bg-success text-white' : 'bg-info text-white'
                }`}>
                  {paymentType === 'paid' ? 'Paid' : 'Invoiced'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-6 pb-8">
        {/* Rep Credit Banner */}
        <Card className="p-4 border-l-4 border-l-brand-600 bg-brand-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">👤</span>
            </div>
            <div>
              <h3 className="font-semibold text-brand-700">Rep credited</h3>
              <p className="text-sm text-brand-600">{currentRep.name}</p>
            </div>
          </div>
        </Card>

        {/* PO Banners */}
        <div className="space-y-3">
          <h3 className="font-semibold text-text-primary">Purchase Orders Sent</h3>
          {BRANDS.slice(0, 2).map((brand) => (
            <Card key={brand.id} className="p-4 border-l-4 border-l-success bg-success/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">PO sent to {brand.name}</p>
                  <p className="text-sm text-text-secondary">Processing will begin shortly</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Delivery Timeline */}
        <Card className="p-4 border border-border-secondary">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Truck size={20} className="text-brand-600" />
              <h3 className="font-semibold text-text-primary">Delivery Information</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Estimated Delivery:</span>
                <span className="font-semibold text-text-primary">
                  {estimatedDelivery.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <div className="bg-surface-secondary rounded-lg p-3">
                <p className="text-sm text-text-secondary">
                  Most brands ship within 1-2 business days. You'll receive tracking information via email.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Invoice Info (if applicable) */}
        {paymentType === 'invoice' && (
          <Card className="p-4 border border-info bg-info/5">
            <div className="flex items-center space-x-3 mb-3">
              <FileText size={20} className="text-info" />
              <h3 className="font-semibold text-info">Invoice Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Due Date:</span>
                <span className="font-semibold text-text-primary">
                  {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Invoice will be available in your account within 24 hours.
              </p>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Link to="/orders">
            <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white pill">
              View Order Status
            </Button>
          </Link>
          
          <Link to="/home">
            <Button variant="outline" className="w-full border-brand-600 text-brand-600 pill">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}