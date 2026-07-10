'use client';

type Category = 'SANDWICH_KIMBAP' | 'DESSERT' | 'BEVERAGE' | 'ETC';

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'SANDWICH_KIMBAP', label: '샌드위치&김밥' },
  { value: 'BEVERAGE', label: '음료' },
  { value: 'DESSERT', label: '디저트' },
  { value: 'ETC', label: '기타' },
];

interface ShopCategorySelectorProps {
  value: Category | null;
  onChange: (category: Category) => void;
}

export default function ShopCategorySelector({
  value,
  onChange,
}: ShopCategorySelectorProps) {
  return (
    <div className="flex gap-2 w-full">
      {CATEGORY_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 flex flex-col items-center gap-1 px-2.5 py-3 rounded-lg outline outline-1 outline-offset-[-1px] ${
            value === option.value
              ? 'outline-brand-default bg-brand-background'
              : 'outline-border-strong'
          }`}
        >
          <span
            className={`text-sm font-medium ${
              value === option.value ? 'text-brand-default' : 'text-text-default'
            }`}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}