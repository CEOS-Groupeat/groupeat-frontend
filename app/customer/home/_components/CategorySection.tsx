import CategoryButton from './CategoryButton';
import SandwichIcon from '@/public/illust/illust_Sandwich.svg';
import DrinkIcon from '@/public/illust/illust_Drinks.svg';
import DessertIcon from '@/public/illust/illust_Dessert.svg';
import EtcIcon from '@/public/illust/illust_Others.svg';

const CATEGORIES = [
  { value: 'sandwich', label: '샌드위치', icon: SandwichIcon },
  { value: 'drink', label: '음료', icon: DrinkIcon },
  { value: 'dessert', label: '디저트', icon: DessertIcon },
  { value: 'etc', label: '기타', icon: EtcIcon },
] as const;

interface CategorySectionProps {
  onCategoryClick: () => void;
}

export default function CategorySection({
  onCategoryClick,
}: CategorySectionProps) {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map((category) => (
        <CategoryButton
          key={category.value}
          icon={<category.icon />}
          label={category.label}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
}
