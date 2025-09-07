import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function ComingSoonModal({ isOpen, onClose, title, description }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto rounded-card">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto">
            <Badge variant="secondary" className="bg-gradient-start text-brand-700 pill">
              Coming soon
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold text-text-primary">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-text-secondary text-center leading-relaxed">
            This feature is in development. It will help you <strong>{description}</strong>. Ask your rep for early access.
          </p>
          
          <Button 
            onClick={onClose}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white pill"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}