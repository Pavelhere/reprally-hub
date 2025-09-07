import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

export default function Waitlist() {
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <div className="min-h-screen hero-gradient">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-4 right-4 z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-between max-w-sm mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
              <span className="font-semibold text-text-primary">Account created</span>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-text-muted hover:text-text-primary"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Circular Decorations */}
      <div className="absolute top-32 left-0 w-48 h-48 bg-white/20 rounded-full -translate-x-1/2"></div>
      <div className="absolute top-48 right-0 w-64 h-64 bg-white/15 rounded-full translate-x-1/2"></div>
      
      {/* Main Content */}
      <div className="flex flex-col min-h-screen px-6 pt-32 pb-16 relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-sm mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-text-primary">
              You're waitlisted!
            </h1>
            <p className="text-text-secondary leading-relaxed">
              Haven't filled out the application yet? Please complete it now.
            </p>
          </div>
          
          <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white pill h-14 text-lg font-semibold">
            Complete waitlist form
          </Button>
          
          <div className="space-y-2 text-sm text-text-secondary">
            <p>
              If you already have, we'll contact you by email shortly.{' '}
              <button className="text-brand-600 font-semibold underline">
                Contact us
              </button>{' '}
              with more questions.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/welcome">
            <Button variant="ghost" className="text-brand-600">
              Back to Welcome
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}