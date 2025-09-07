import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { formatCurrency, getInvoiceStatusBadge } from '@/lib/credit';
import { SAMPLE_INVOICES } from '@/lib/seed-data';
import { useAppStore } from '@/lib/store';

export default function Invoices() {
  const { updateCreditUsed } = useAppStore();
  const [invoices, setInvoices] = useState(SAMPLE_INVOICES);

  const handlePayInvoice = (invoiceId: string, amount: number) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice =>
        invoice.id === invoiceId
          ? { ...invoice, status: 'paid' as const, paid_at: new Date().toISOString() }
          : invoice
      )
    );
    updateCreditUsed(-amount); // Reduce credit used
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border-secondary px-4 pt-12 pb-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-text-primary">Invoices</h1>
          <p className="text-text-secondary">Manage your payment obligations</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-4">
        {invoices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No invoices</h3>
            <p className="text-text-secondary">Your invoices will appear here</p>
          </div>
        ) : (
          invoices.map((invoice) => {
            const statusBadge = getInvoiceStatusBadge(invoice.due_date, invoice.status);
            
            return (
              <Card key={invoice.id} className="p-4 border border-border-secondary">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`pill text-xs ${
                            statusBadge.color === 'success' ? 'bg-success text-white' :
                            statusBadge.color === 'warning' ? 'bg-warning text-white' :
                            statusBadge.color === 'danger' ? 'bg-danger text-white' :
                            'bg-info text-white'
                          }`}
                        >
                          {statusBadge.text}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm text-text-muted">Invoice #{invoice.id.slice(-6)}</p>
                        <p className="text-sm text-text-muted">
                          Due: {new Date(invoice.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-text-primary">
                        {formatCurrency(invoice.amount_cents)}
                      </p>
                    </div>
                  </div>
                  
                  {invoice.status !== 'paid' && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handlePayInvoice(invoice.id, invoice.amount_cents)}
                        className="flex-1 bg-brand-600 hover:bg-brand-700 text-white pill"
                      >
                        Pay now
                      </Button>
                      <Button variant="outline" className="border-brand-600 text-brand-600 pill">
                        View Details
                      </Button>
                    </div>
                  )}
                  
                  {invoice.status === 'paid' && (
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                      <p className="text-sm text-success font-medium">
                        ✓ Paid on {invoice.paid_at ? new Date(invoice.paid_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}