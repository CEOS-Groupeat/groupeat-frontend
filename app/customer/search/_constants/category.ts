import SandwichIcon from '@/public/illust/illust_Sandwich.svg';
import DrinkIcon from '@/public/illust/illust_Drinks.svg';
import DessertIcon from '@/public/illust/illust_Dessert.svg';
import EtcIcon from '@/public/illust/illust_Others.svg';

export const CATEGORIES = [
  { id: 'SANDWICH_KIMBAP', label: '샌드위치&김밥', icon: SandwichIcon },
  { id: 'BEVERAGE', label: '음료', icon: DrinkIcon },
  { id: 'DESSERT', label: '디저트', icon: DessertIcon },
  { id: 'ETC', label: '기타', icon: EtcIcon },
] as const;
