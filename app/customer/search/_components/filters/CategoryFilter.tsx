'use client';

import { CATEGORIES } from '@/app/customer/search/_constants/category';

interface CategoryFilterProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  const handleToggle = (id: string) => {
    onChange(value === id ? undefined : id);
  };

  return (
    <div className="flex gap-1.5 flex-wrap">
      {CATEGORIES.map((category) => {
        const isSelected = value === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => handleToggle(category.id)}
            aria-pressed={isSelected}
            className={`w-[81px] h-[66px] px-3 py-1.5 outline outline-1 outline-offset-[-1px] outline-border-subtle rounded-lg flex flex-col items-center gap-1 shrink-0 transition-colors ${
              isSelected ? 'bg-background-subtle' : 'bg-static-white'
            }`}
          >
            <category.icon className="w-8 h-8" aria-hidden="true" />
            <span className="text-caption1 font-semibold text-text-subtle font-['Pretendard'] shrink-0">
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
