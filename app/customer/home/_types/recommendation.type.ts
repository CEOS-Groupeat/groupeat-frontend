import type { GetResponse } from '@/src/types/api';

export type TopRatedStoresResponse =
  GetResponse<'/api/recommendations/top-rated'>;
export type HighDiscountStoresResponse =
  GetResponse<'/api/recommendations/high-discount'>;

export type TopRatedStoresData = NonNullable<TopRatedStoresResponse['data']>;
export type RecommendedStore = NonNullable<
  TopRatedStoresData['stores']
>[number];

export interface HomeStore {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
}

export function toHomeStore(store: RecommendedStore): HomeStore {
  return {
    id: store.storeId ?? 0,
    name: store.storeName ?? '',
    category: store.category ?? '',
    priceRange: `${(store.minPrice ?? 0).toLocaleString()}원 ~ ${(store.maxPrice ?? 0).toLocaleString()}원`,
    rating: store.rating ?? 0,
    reviewCount: store.reviewCount ?? 0,
    location: `${store.district ?? ''} ${store.neighborhood ?? ''}`.trim(),
    image: store.imageUrl ?? '/images/image_logo.png',
  };
}
