import { create } from 'zustand';
import { CartItem, Product } from './types';
import { PRODUCTS, STORE, REP, BRANDS } from './seed-data';

interface AppState {
  // User & Store
  isAuthenticated: boolean;
  currentStore: typeof STORE;
  currentRep: typeof REP;
  
  // Cart
  cart: CartItem[];
  
  // Products
  products: Product[];
  
  // Actions
  login: () => void;
  logout: () => void;
  addToCart: (productId: string, qty: number) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartByBrand: () => { [brandId: string]: CartItem[] };
  updateCreditUsed: (amountCents: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  currentStore: STORE,
  currentRep: REP,
  cart: [],
  products: PRODUCTS,
  
  // Actions
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, cart: [] }),
  
  addToCart: (productId: string, qty: number) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.product_id === productId);
    
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.product_id === productId
            ? { ...item, qty: item.qty + qty }
            : item
        )
      });
    } else {
      set({ cart: [...cart, { product_id: productId, qty }] });
    }
  },
  
  updateCartQty: (productId: string, qty: number) => {
    const { cart } = get();
    if (qty <= 0) {
      set({ cart: cart.filter(item => item.product_id !== productId) });
    } else {
      set({
        cart: cart.map(item =>
          item.product_id === productId ? { ...item, qty } : item
        )
      });
    }
  },
  
  removeFromCart: (productId: string) => {
    const { cart } = get();
    set({ cart: cart.filter(item => item.product_id !== productId) });
  },
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    const { cart, products } = get();
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.product_id);
      return total + (product?.price_cents || 0) * item.qty;
    }, 0);
  },
  
  getCartByBrand: () => {
    const { cart, products } = get();
    const brandGroups: { [brandId: string]: CartItem[] } = {};
    
    cart.forEach(item => {
      const product = products.find(p => p.id === item.product_id);
      if (product) {
        if (!brandGroups[product.brand_id]) {
          brandGroups[product.brand_id] = [];
        }
        brandGroups[product.brand_id].push(item);
      }
    });
    
    return brandGroups;
  },
  
  updateCreditUsed: (amountCents: number) => {
    const { currentStore } = get();
    set({
      currentStore: {
        ...currentStore,
        credit_used_cents: currentStore.credit_used_cents + amountCents
      }
    });
  },
}));