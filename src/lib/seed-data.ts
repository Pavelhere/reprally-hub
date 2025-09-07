import { Store, Rep, Brand, Product, Order, Invoice } from './types';

export const STORE: Store = {
  id: 'store-1',
  name: 'Sample Market, Brooklyn',
  tier: 2,
  credit_limit_cents: 500000, // $5,000
  credit_used_cents: 75000, // $750
  rep_id: 'rep-1',
};

export const REP: Rep = {
  id: 'rep-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@reprally.com',
};

export const BRANDS: Brand[] = [
  {
    id: 'brand-1',
    name: 'Canyon Snacks',
    support_email: 'support@canyonsnacks.com',
  },
  {
    id: 'brand-2',
    name: 'Northside Beverages',
    support_email: 'orders@northsidebev.com',
  },
  {
    id: 'brand-3',
    name: 'Peak Nutrition',
    support_email: 'fulfillment@peaknutrition.com',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    brand_id: 'brand-1',
    name: 'Granola Bites',
    case_size: '12 pack of 1oz.',
    price_cents: 3800,
    category: 'Snacks',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-2',
    brand_id: 'brand-1',
    name: 'Trail Mix Variety',
    case_size: '8 pack of 2oz.',
    price_cents: 4200,
    category: 'Snacks',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-3',
    brand_id: 'brand-1',
    name: 'Protein Bars',
    case_size: '24 pack',
    price_cents: 5600,
    category: 'Health',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-4',
    brand_id: 'brand-2',
    name: 'Cold Brew Coffee',
    case_size: '12 bottles',
    price_cents: 3400,
    category: 'Beverages',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-5',
    brand_id: 'brand-2',
    name: 'Sparkling Water',
    case_size: '24 cans',
    price_cents: 2800,
    category: 'Beverages',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-6',
    brand_id: 'brand-2',
    name: 'Energy Drinks',
    case_size: '12 cans',
    price_cents: 4800,
    category: 'Beverages',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-7',
    brand_id: 'brand-3',
    name: 'Protein Powder',
    case_size: '6 containers',
    price_cents: 8900,
    category: 'Health',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
  {
    id: 'prod-8',
    brand_id: 'brand-3',
    name: 'Vitamin Gummies',
    case_size: '12 bottles',
    price_cents: 3600,
    category: 'Health',
    image_url: '/api/placeholder/200/200',
    active: true,
  },
];

export const REORDER_PRODUCTS = ['prod-1', 'prod-4', 'prod-5', 'prod-8'];
export const ORDER_GUIDE_PRODUCTS = ['prod-2', 'prod-3', 'prod-6', 'prod-7'];

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'order-1',
    store_id: 'store-1',
    rep_id: 'rep-1',
    total_cents: 21600,
    payment_type: 'invoice',
    status: 'delivered',
    created_at: '2024-06-21T10:00:00Z',
    lines: [
      {
        id: 'line-1',
        order_id: 'order-1',
        product_id: 'prod-1',
        brand_id: 'brand-1',
        qty: 3,
        unit_price_cents: 3800,
        status: 'fulfilled',
      },
      {
        id: 'line-2',
        order_id: 'order-1',
        product_id: 'prod-4',
        brand_id: 'brand-2',
        qty: 3,
        unit_price_cents: 3400,
        status: 'fulfilled',
      },
    ],
  },
  {
    id: 'order-2',
    store_id: 'store-1',
    rep_id: 'rep-1',
    total_cents: 11400,
    payment_type: 'invoice',
    status: 'shipped',
    created_at: '2024-06-27T14:30:00Z',
    lines: [
      {
        id: 'line-3',
        order_id: 'order-2',
        product_id: 'prod-5',
        brand_id: 'brand-2',
        qty: 2,
        unit_price_cents: 2800,
        status: 'fulfilled',
      },
      {
        id: 'line-4',
        order_id: 'order-2',
        product_id: 'prod-8',
        brand_id: 'brand-3',
        qty: 1,
        unit_price_cents: 3600,
        status: 'fulfilled',
      },
    ],
  },
];

export const SAMPLE_INVOICES: Invoice[] = [
  {
    id: 'invoice-1',
    order_id: 'order-2',
    store_id: 'store-1',
    amount_cents: 75000,
    due_date: '2024-07-15T00:00:00Z',
    status: 'issued',
  },
];