export type Tier = 0 | 1 | 2 | 3; // 0: No terms, 1: Net7, 2: Net14, 3: Net30

export interface Store {
  id: string;
  name: string;
  tier: Tier;
  credit_limit_cents: number;
  credit_used_cents: number;
  rep_id: string;
}

export interface Rep {
  id: string;
  name: string;
  email: string;
}

export interface Brand {
  id: string;
  name: string;
  support_email: string;
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  image_url: string;
  case_size: string;
  price_cents: number;
  category: string;
  active: boolean;
}

export interface OrderLine {
  id: string;
  order_id: string;
  product_id: string;
  brand_id: string;
  qty: number;
  unit_price_cents: number;
  status: 'pending' | 'fulfilled';
}

export interface Order {
  id: string;
  store_id: string;
  rep_id: string;
  total_cents: number;
  payment_type: 'pay_now' | 'invoice';
  status: 'processing' | 'shipped' | 'delivered';
  created_at: string;
  lines: OrderLine[];
}

export interface Invoice {
  id: string;
  order_id: string;
  store_id: string;
  amount_cents: number;
  due_date: string;
  status: 'issued' | 'past_due' | 'paid';
  paid_at?: string;
}

export interface CartItem {
  product_id: string;
  qty: number;
}

export interface CreditInfo {
  limit_cents: number;
  used_cents: number;
  available_cents: number;
  tier: Tier;
  net_terms: string;
}