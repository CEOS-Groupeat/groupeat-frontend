// MVP 구현범위: 고객 메인 페이지-가게 추천 api 대신 mocks 데이터로 구현
import { HomeStore } from '../_types/recommendation.type';

export const recommendedStores: HomeStore[] = [
  {
    id: 7,
    name: '데이브런치',
    category: '샌드위치&김밥',
    priceRange: '7,000원 ~ 12,000원/개',
    rating: 4.7,
    reviewCount: 3,
    location: '마포구 아현동',
    image: '/images/day-brunch.png',
  },
  {
    id: 8,
    name: '마이엑스',
    category: '샌드위치&김밥',
    priceRange: '11,000원 ~ 20,000원/개',
    rating: 4.9,
    reviewCount: 12,
    location: '마포구 연남동',
    image: '/images/my-x.png',
  },
  {
    id: 9,
    name: '하울즈',
    category: '샌드위치&김밥',
    priceRange: '7,000원 ~ 12,000원/개',
    rating: 4.7,
    reviewCount: 3,
    location: '마포구 아현동',
    image: '/images/howls.png',
  },
];
