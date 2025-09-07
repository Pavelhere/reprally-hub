import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/BottomNav';
import { formatCurrency } from '@/lib/credit';
import { SAMPLE_ORDERS, BRANDS } from '@/lib/seed-data';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('receivables');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-white';
      case 'shipped': return 'bg-info text-white';
      case 'processing': return 'bg-warning text-white';
      default: return 'bg-text-muted text-white';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'processing': return 33;
      case 'shipped': return 66;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const getBrandName = (brandId: string) => {
    return BRANDS.find(b => b.id === brandId)?.name || 'Unknown Brand';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border-secondary px-4 pt-12 pb-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
          <p className="text-text-secondary">Track your order status</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-surface-secondary rounded-pill">
            <TabsTrigger value="pending" className="pill">pending</TabsTrigger>
            <TabsTrigger value="receivables" className="pill">receivables</TabsTrigger>
            <TabsTrigger value="completed" className="pill">completed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-4">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No pending orders</h3>
              <p className="text-text-secondary">Your new orders will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="receivables" className="mt-6 space-y-4">
            {SAMPLE_ORDERS.filter(order => order.status === 'shipped').map((order) => (
              <Card key={order.id} className="p-4 border border-border-secondary">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs pill ${getStatusColor('Rally Grocery')}`}>
                          Rally Grocery
                        </Badge>
                        <span className="text-xs text-text-muted">06/31/23</span>
                      </div>
                      <p className="text-sm font-mono text-brand-600">#ABCUDIOW839</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">
                        {formatCurrency(order.total_cents)}
                      </p>
                    </div>
                  </div>

                  {/* Warning Banner */}
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-center space-x-2">
                    <div className="w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-sm text-warning font-medium">
                      8 days left till auto e-check
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-brand-600 font-medium">10 brands delivered / 10</span>
                      <span className="text-success font-medium">✓</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>Delivered on</span>
                      <span className="text-success font-medium">06/27/23</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {SAMPLE_ORDERS.filter(order => order.status === 'delivered').map((order) => (
              <Card key={order.id} className="p-4 border border-border-secondary">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Badge className="text-xs pill bg-success text-white">
                          Rally Supply
                        </Badge>
                        <span className="text-xs text-text-muted">06/22/23</span>
                      </div>
                      <p className="text-sm font-mono text-brand-600">#ABCUDIOW834</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">
                        {formatCurrency(order.total_cents)}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-brand-600 font-medium">10 brands delivered / 10</span>
                      <span className="text-success font-medium">✓</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>Delivered on</span>
                      <span className="text-success font-medium">06/21/23</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}