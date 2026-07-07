import SandwichIcon from '@/public/illust/illust_Sandwich.svg';
import DrinkIcon from '@/public/illust/illust_Drinks.svg';
import DessertIcon from '@/public/illust/illust_Dessert.svg';
import EtcIcon from '@/public/illust/illust_Others.svg';

export const CATEGORIES = [
  { id: '샌드위치&김밥', label: '샌드위치', icon: SandwichIcon },
  { id: '음료', label: '음료', icon: DrinkIcon },
  { id: '디저트', label: '디저트', icon: DessertIcon },
  { id: '기타', label: '기타', icon: EtcIcon },
] as const;
