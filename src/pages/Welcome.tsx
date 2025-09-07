import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Status Bar Simulation */}
      <div className="flex justify-between items-center px-4 pt-2 pb-1 text-sm">
        <span className="font-semibold">16:21</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <span className="text-xs ml-2">📶 📶 🔋</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col min-h-screen px-6 pt-16 pb-32">
        {/* Circular Decorations */}
        <div className="absolute top-20 left-8 w-32 h-32 bg-white/20 rounded-full"></div>
        <div className="absolute top-32 right-4 w-24 h-24 bg-white/15 rounded-full"></div>
        
        {/* Photos Section */}
        <div className="relative mt-8 mb-16">
          <div className="flex justify-center space-x-4">
            <div className="w-32 h-20 bg-white rounded-xl overflow-hidden shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span className="text-green-600 text-lg">🏪</span>
              </div>
            </div>
            <div className="w-32 h-20 bg-white rounded-xl overflow-hidden shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-blue-600 text-lg">👨‍💼</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-text-primary leading-tight">
              Welcome to RepRally
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xs mx-auto">
              Login and start earning immediately. Enjoy exclusive access to top-rated products
            </p>
          </div>
          
          <div className="space-y-4 pt-8">
            <Link to="/login" className="block">
              <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white pill h-14 text-lg font-semibold">
                Log in
              </Button>
            </Link>
            
            <p className="text-text-secondary">
              Don't have an account?{' '}
              <Link to="/waitlist" className="text-brand-600 font-semibold underline">
                Register here
              </Link>
            </p>
            
            <Link to="/about" className="block mt-6">
              <Button variant="ghost" className="text-brand-600 underline">
                Learn more about us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}