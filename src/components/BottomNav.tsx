import { Home, Book, Truck, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/home' },
  { id: 'catalog', label: 'Catalog', icon: Book, href: '/catalog' },
  { id: 'orders', label: 'Orders', icon: Truck, href: '/orders' },
  { id: 'account', label: 'Account', icon: User, href: '/account' },
];

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-secondary z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`flex flex-col items-center justify-center space-y-1 min-w-0 flex-1 py-2 transition-colors ${
                  isActive
                    ? 'text-brand-600'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                <Icon 
                  size={20} 
                  className={isActive ? 'text-brand-600' : 'text-text-muted'} 
                />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-brand-600' : 'text-text-muted'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}