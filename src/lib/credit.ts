import { Tier } from './types';

export const TIER_CONFIG = {
  0: { name: 'No Terms', net_days: 0, limit_cents: 0 },
  1: { name: 'Net 7', net_days: 7, limit_cents: 150000 }, // $1,500
  2: { name: 'Net 14', net_days: 14, limit_cents: 500000 }, // $5,000
  3: { name: 'Net 30', net_days: 30, limit_cents: 1500000 }, // $15,000
} as const;

export function getTierConfig(tier: Tier) {
  return TIER_CONFIG[tier];
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export function calculateAvailableCredit(limitCents: number, usedCents: number): number {
  return Math.max(0, limitCents - usedCents);
}

export function canPlaceInvoiceOrder(orderTotalCents: number, availableCreditCents: number): boolean {
  return orderTotalCents <= availableCreditCents;
}

export function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getInvoiceStatusBadge(dueDate: string, status: string) {
  if (status === 'paid') return { text: 'Paid', color: 'success' };
  
  const daysUntilDue = getDaysUntilDue(dueDate);
  
  if (daysUntilDue < 0) {
    return { text: `Past due ${Math.abs(daysUntilDue)} days`, color: 'danger' };
  } else if (daysUntilDue === 0) {
    return { text: 'Due today', color: 'warning' };
  } else {
    return { text: `Due in ${daysUntilDue} days`, color: 'info' };
  }
}