export interface SearchFilter {
  location: string;
  date: string | null;
  pickupTimes: string[];
  quantity: number | null;
  minBudget: number;
  maxBudget: number;
  categories: string[];
}