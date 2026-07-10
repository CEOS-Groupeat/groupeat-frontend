'use client';

import CategoryButton from '@/app/customer/home/_components/CategoryButton';
import { CATEGORIES } from '@/app/customer/search/_constants/category';

type Category = (typeof CATEGORIES)[number]['id'];

interface ShopCategorySelectorProps {
  value: Category | null;
  onChange: (category: Category) => void;
}

interface ShopCategorySelectorProps {
  value: Category | null;
  onChange: (category: Category) => void;
}

export default function ShopCategorySelector({
  value,
  onChange,
}: ShopCategorySelectorProps) {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <CategoryButton
            key={category.id}
            icon={<Icon />}
            label={category.label}
            isActive={value === category.id}
            onClick={() => onChange(category.id)}
          />
        );
      })}
    </div>
  );
}
