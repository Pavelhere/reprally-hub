import { Progress } from '@/components/ui/progress';
import { formatCurrency, getTierConfig, calculateAvailableCredit } from '@/lib/credit';
import { useAppStore } from '@/lib/store';

export default function CreditCard() {
  const { currentStore } = useAppStore();
  const tierConfig = getTierConfig(currentStore.tier);
  const availableCredit = calculateAvailableCredit(
    currentStore.credit_limit_cents,
    currentStore.credit_used_cents
  );
  const creditUsagePercent = (currentStore.credit_used_cents / currentStore.credit_limit_cents) * 100;

  return (
    <div className="bg-surface rounded-card p-5 card-shadow border border-border-secondary">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-text-primary">Available Credit</h3>
        <span className="text-sm text-brand-600 font-medium">
          Tier {currentStore.tier} • {tierConfig.name}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-text-primary">
            {formatCurrency(availableCredit)}
          </span>
          <span className="text-sm text-text-secondary">
            / {formatCurrency(currentStore.credit_limit_cents)}
          </span>
        </div>
        
        <Progress 
          value={creditUsagePercent} 
          className="h-2"
        />
        
        <p className="text-xs text-text-muted">
          Auto-increases with on-time payments
        </p>
      </div>
    </div>
  );
}