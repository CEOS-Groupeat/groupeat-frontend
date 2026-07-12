import CategoryButton from './CategoryButton';
import { CATEGORIES } from '@/app/customer/search/_constants/category';
import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';

type CategoryValue = NonNullable<StoreSearchParams['category']>;

interface CategorySectionProps {
  onCategoryClick: (category: CategoryValue) => void;
  appliedFilters: StoreSearchParams;
}

export default function CategorySection({
  onCategoryClick,
  appliedFilters,
}: CategorySectionProps) {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map((category) => (
        <CategoryButton
          key={category.id}
          icon={<category.icon />}
          label={category.label}
          onClick={() => onCategoryClick(category.id)}
          isActive={appliedFilters.category === category.id}
        />
      ))}
    </div>
  );
}
