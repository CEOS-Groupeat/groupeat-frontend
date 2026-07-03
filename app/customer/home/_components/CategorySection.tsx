import CategoryButton from './CategoryButton';
import SandwichIcon from '@/public/illusts/illust-sandwich.svg';
import DrinkIcon from '@/public/illusts/illust-drink.svg';
import DessertIcon from '@/public/illusts/illust-dessert.svg';
import EtcIcon from '@/public/illusts/illust-etc.svg';

const CATEGORIES = [
  { value: 'sandwich', label: '샌드위치', icon: SandwichIcon },
  { value: 'drink', label: '음료', icon: DrinkIcon },
  { value: 'dessert', label: '디저트', icon: DessertIcon },
  { value: 'etc', label: '기타', icon: EtcIcon },
] as const;

export default function CategorySection() {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map((category) => (
        <CategoryButton
          key={category.value}
          icon={<category.icon />}
          label={category.label}
        />
      ))}
    </div>
  );
}