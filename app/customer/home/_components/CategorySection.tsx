import CategoryButton from './CategoryButton';
import { StoreSearchParams } from '../../search/_types/store.type';
import { CATEGORIES } from '@/app/customer/search/_constants/category';

interface CategorySectionProps {
  onCategoryClick: () => void;
  appliedFilters: StoreSearchParams;
}

export default function CategorySection({
  onCategoryClick,
  appliedFilters
}: CategorySectionProps) {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map((category) => (
        <CategoryButton
          key={category.id}
          icon={<category.icon />}
          label={category.label}
          onClick={onCategoryClick}
          isActive={appliedFilters.category === category.id}
        />
      ))}
    </div>
  );
}
