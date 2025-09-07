import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Settings, HelpCircle, LogOut, Shield } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAppStore } from '@/lib/store';
import { formatCurrency, getTierConfig } from '@/lib/credit';
import { Link, useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const { currentStore, currentRep, logout } = useAppStore();
  const tierConfig = getTierConfig(currentStore.tier);

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="hero-gradient px-4 pt-12 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={24} className="text-text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">{currentStore.name}</h1>
              <p className="text-text-secondary">Managed by {currentRep.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-md mx-auto space-y-6">
        {/* Account Status */}
        <Card className="p-4 border border-border-secondary">
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">Account Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">Credit Tier</p>
                <Badge className="pill bg-brand-600 text-white">
                  Tier {currentStore.tier}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">Payment Terms</p>
                <p className="font-semibold text-text-primary">{tierConfig.name}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-text-secondary">Credit Limit</p>
              <p className="text-lg font-bold text-text-primary">
                {formatCurrency(currentStore.credit_limit_cents)}
              </p>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          <Link to="/profile">
            <Card className="p-4 border border-border-secondary hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                  <User size={20} className="text-brand-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">Profile & Store Info</h4>
                  <p className="text-sm text-text-secondary">Update your business details</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin">
            <Card className="p-4 border border-border-secondary hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-brand-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">Demo Admin</h4>
                  <p className="text-sm text-text-secondary">Adjust demo settings</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className="p-4 border border-border-secondary hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                <Settings size={20} className="text-brand-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary">Settings</h4>
                <p className="text-sm text-text-secondary">Preferences and notifications</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border border-border-secondary hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                <HelpCircle size={20} className="text-brand-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary">Help & Support</h4>
                <p className="text-sm text-text-secondary">Get help or contact support</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-danger text-danger hover:bg-danger hover:text-white pill"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}