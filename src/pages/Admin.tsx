import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/credit';
import { Tier } from '@/lib/types';

export default function Admin() {
  const navigate = useNavigate();
  const { currentStore } = useAppStore();
  const [tier, setTier] = useState<Tier>(currentStore.tier);
  const [creditLimit, setCreditLimit] = useState(currentStore.credit_limit_cents / 100);
  const [creditUsed, setCreditUsed] = useState(currentStore.credit_used_cents / 100);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Demo Admin</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Store Settings</h3>
              
              <div className="space-y-2">
                <Label>Credit Tier</Label>
                <Select value={tier.toString()} onValueChange={(value) => setTier(Number(value) as Tier)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Tier 0 - No Terms</SelectItem>
                    <SelectItem value="1">Tier 1 - Net 7 ($1.5k)</SelectItem>
                    <SelectItem value="2">Tier 2 - Net 14 ($5k)</SelectItem>
                    <SelectItem value="3">Tier 3 - Net 30 ($15k)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Credit Limit ($)</Label>
                <Input 
                  type="number" 
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Credit Used ($)</Label>
                <Input 
                  type="number" 
                  value={creditUsed}
                  onChange={(e) => setCreditUsed(Number(e.target.value))}
                />
              </div>

              <Button className="w-full bg-brand-600 text-white">
                Update Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}