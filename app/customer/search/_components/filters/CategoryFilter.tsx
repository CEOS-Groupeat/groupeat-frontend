'use client';

import { CATEGORIES } from '@/app/customer/search/_constants/category';
import CategoryImage from '@/public/iconscategory_placeholder.svg';

interface CategoryFilterProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  const handleToggle = (id: string) => {
    onChange(value === id ? '' : id);
  };

  return (
    <div className="flex gap-2.5 flex-wrap">
      {CATEGORIES.map((category) => {
        const isSelected = value === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => handleToggle(category.id)}
            className={`w-[107px] h-[74px] px-3 py-2 rounded-lg flex flex-col items-center gap-0.5 shrink-0 transition-colors ${
              isSelected
                ? 'bg-brand-background'
                : 'bg-background-default outline outline-1 outline-offset-[-1px] outline-border-default'
            }`}
          >
            <CategoryImage />
            <span
              className={`text-label1 font-['Pretendard'] shrink ${
                isSelected
                  ? 'text-brand-default font-semibold'
                  : 'text-text-default font-medium'
              }`}
            >
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
