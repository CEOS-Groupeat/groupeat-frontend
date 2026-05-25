'use client';

// ─── 카테고리 목록 (정적) ────────────────────────────
const CATEGORIES = [
  { id: '샌드위치&김밥', label: '샌드위치&김밥' },
  { id: '음료', label: '음료' },
  { id: '디저트', label: '디저트' },
];

interface CategoryFilterProps {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  onConfirm: () => void; // 카테고리는 자동 닫힘 없음 — 필요 시 부모가 호출
}

export default function CategoryFilter({
  value = [],
  onChange,
}: CategoryFilterProps) {
  const selected = value ?? [];

  const handleToggle = (id: string) => {
    const isSelected = selected.includes(id);
    const next = isSelected
      ? selected.filter((v) => v !== id) // 선택 해제
      : [...selected, id]; // 선택 추가
    onChange(next);
  };

  return (
    <div className="mt-3 flex gap-2.5 flex-wrap">
      {CATEGORIES.map((cat) => {
        const isSelected = selected.includes(cat.id);

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleToggle(cat.id)}
            className={`w-28 px-3 py-2 rounded-lg flex flex-col items-center gap-2.5 transition-colors ${
              isSelected
                ? 'bg-brand-background' // ✅ 선택됨
                : 'bg-background-default outline outline-1 outline-border-default' // ✅ 미선택
            }`}
          >
            {/* 카테고리 이미지 — 추후 실제 이미지로 교체 */}
            <div className="size-8 rounded-sm bg-background-subtlest" />

            <span
              className={`text-sm leading-5 ${
                isSelected
                  ? 'text-brand-default font-semibold' // ✅ 선택됨
                  : 'text-text-default font-medium' // ✅ 미선택
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
