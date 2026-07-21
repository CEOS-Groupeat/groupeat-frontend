'use client';

interface WeekdayTabButtonProps {
  label: string;
  isSelected: boolean; // 지금 상세를 보고 있는 요일인지
  isAvailable: boolean; // 주문 가능(휴무 아님)인지
  onClick: () => void;
}

export default function WeekdayTabButton({
  label,
  isSelected,
  isAvailable,
  onClick,
}: WeekdayTabButtonProps) {
  const stateClass = isSelected
    ? 'bg-brand-default outline-border-default'
    : isAvailable
      ? 'bg-brand-background outline-brand-default'
      : 'bg-background-default outline-border-default';

  const textClass = isSelected
    ? 'text-text-inverse font-semibold'
    : isAvailable
      ? 'text-brand-default font-semibold'
      : 'text-text-default font-normal';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 h-10 px-1 py-3 rounded-lg outline outline-1 outline-offset-[-1px] flex justify-center items-center overflow-hidden ${stateClass}`}
    >
      <span
        className={`text-center text-label2 font-['Pretendard'] ${textClass}`}
      >
        {label}
      </span>
    </button>
  );
}
