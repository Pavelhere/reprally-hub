import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppStore();

  const handleLogin = () => {
    login();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-text-primary">Welcome Back</h1>
          <p className="text-text-secondary">
            Sign in to your RepRally account
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleLogin}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white pill h-12"
          >
            Login as Sample Market (Tier 2, $5k limit)
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-text-muted">Demo authentication</span>
          </div>
        </div>
      </Card>
    </div>
  );
}