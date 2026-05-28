// export type { Store } from '@/app/customer/search/_types/store.type';
export interface Store {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
}
