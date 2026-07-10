'use client';

type Gender = 'MALE' | 'FEMALE';

interface GenderSelectorProps {
  value: Gender | null;
  onChange: (gender: Gender) => void;
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: '남' },
  { value: 'FEMALE', label: '여' },
];

export default function GenderSelector({
  value,
  onChange,
}: GenderSelectorProps) {
  return (
    <div className="flex items-center gap-3 font-['Pretendard']">
      {GENDER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`w-[165.5px] h-11 px-2.5 py-3 rounded-lg outline outline-1 outline-offset-[-1px] flex justify-center items-center ${
            value === option.value
              ? 'outline-brand-background bg-brand-background font-semibold text-brand-default'
              : 'outline-border-strong font-medium text-text-default'
          }`}
        >
          <span className="text-label1">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
