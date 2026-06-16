import { formatPickupDate } from '../_components/filters/DateFilter';
import { formatBudget } from '../_components/filters/BudgetFilter';
import type { StoreSearchParams } from '../_types/store.type';

export function formatChipLabel(
  key: keyof StoreSearchParams,
  value: unknown
): string {
  if (!value) return '';
  if (key === 'quantity') return `${value}개`;
  if (key === 'budget') return formatBudget(value as number);
  if (key === 'category') return value as string;
  if (key === 'pickupDate') return formatPickupDate(value as string);
  return String(value);
}
