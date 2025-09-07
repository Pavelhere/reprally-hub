import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { formatCurrency, getTierConfig, calculateAvailableCredit, canPlaceInvoiceOrder } from '@/lib/credit';

export default function Checkout() {
  const navigate = useNavigate();
  const { currentStore, getCartTotal, clearCart, updateCreditUsed } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState<'pay_now' | 'invoice'>('pay_now');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const cartTotal = getCartTotal();
  const tierConfig = getTierConfig(currentStore.tier);
  const availableCredit = calculateAvailableCredit(
    currentStore.credit_limit_cents,
    currentStore.credit_used_cents
  );
  const canUseInvoice = canPlaceInvoiceOrder(cartTotal, availableCredit);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (paymentMethod === 'pay_now') {
      // Simulate Stripe checkout
      clearCart();
      navigate('/order-confirmation?payment=paid');
    } else {
      // Invoice checkout
      updateCreditUsed(cartTotal);
      clearCart();
      navigate('/order-confirmation?payment=invoice');
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-surface border-b border-border-secondary px-4 pt-12 pb-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={20} className="text-text-primary" />
          </button>
          <h1 className="text-xl font-bold text-text-primary">Checkout</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-6">
        {/* Order Summary */}
        <Card className="p-4 border border-border-secondary">
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">Order Summary</h3>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Amount:</span>
              <span className="text-xl font-bold text-text-primary">
                {formatCurrency(cartTotal)}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4 border border-border-secondary">
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">Payment Method</h3>
            
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'pay_now' | 'invoice')}>
              {/* Pay Now */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border-secondary">
                <RadioGroupItem value="pay_now" id="pay_now" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="pay_now" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard size={18} className="text-text-primary" />
                    <span className="font-medium text-text-primary">Pay Now (Card/ACH)</span>
                  </Label>
                  <p className="text-sm text-text-secondary mt-1">
                    Pay immediately with card or bank transfer
                  </p>
                </div>
              </div>

              {/* Invoice */}
              <div className={`flex items-start space-x-3 p-3 rounded-lg border ${
                canUseInvoice ? 'border-border-secondary' : 'border-border-secondary bg-surface-secondary opacity-60'
              }`}>
                <RadioGroupItem 
                  value="invoice" 
                  id="invoice" 
                  className="mt-1" 
                  disabled={!canUseInvoice}
                />
                <div className="flex-1">
                  <Label htmlFor="invoice" className={`flex items-center space-x-2 ${
                    canUseInvoice ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}>
                    <FileText size={18} className="text-text-primary" />
                    <span className="font-medium text-text-primary">
                      Invoice ({tierConfig.name})
                    </span>
                  </Label>
                  <p className="text-sm text-text-secondary mt-1">
                    Pay within {tierConfig.net_days} days
                  </p>
                  
                  {!canUseInvoice && (
                    <div className="flex items-center space-x-2 mt-2 p-2 bg-danger/10 rounded">
                      <AlertCircle size={16} className="text-danger" />
                      <span className="text-sm text-danger">
                        Exceeds available credit. Reduce items or Pay now.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Available Credit Info */}
        {paymentMethod === 'invoice' && (
          <Card className="p-4 border border-brand-600 bg-brand-50">
            <div className="space-y-2">
              <h4 className="font-semibold text-brand-700">Available Credit</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-600">Available:</span>
                <span className="font-semibold text-brand-700">
                  {formatCurrency(availableCredit)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-600">Order Total:</span>
                <span className="font-semibold text-brand-700">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-brand-200 pt-2">
                <span className="text-sm text-brand-600">Remaining After:</span>
                <span className="font-semibold text-brand-700">
                  {formatCurrency(availableCredit - cartTotal)}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-secondary p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleCheckout}
            disabled={isProcessing || (paymentMethod === 'invoice' && !canUseInvoice)}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white pill h-14 text-lg font-semibold disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(cartTotal)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}