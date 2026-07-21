import type { DayButtonProps } from 'react-day-picker';

interface CustomDayButtonProps extends DayButtonProps {
  step?: 1 | 2;
}

export default function CustomDayButton({
  day,
  modifiers,
  onClick,
  step,
  ...props
}: CustomDayButtonProps) {
  const isToday = modifiers.today ?? false;
  const isSelected = modifiers.selected ?? false;
  const isDisabled = modifiers.disabled ?? false;
  const isOutside = modifiers.outside ?? false;

  const label = isSelected
    ? step === 1
      ? '시작일'
      : '종료일'
    : isToday
      ? '오늘'
      : null;

  return (
    <div className="relative flex flex-col items-center">
      <button
        {...props}
        onClick={onClick}
        disabled={isDisabled || isOutside}
        className={`size-9 py-[9px] rounded-full flex justify-center items-center font-medium text-label2 transition-colors ${
          isSelected
            ? 'bg-brand-default text-white'
            : isDisabled || isOutside
              ? 'text-text-disabled cursor-not-allowed'
              : isToday
                ? 'text-brand-default bg-brand-background'
                : 'text-text-default hover:bg-background-subtle'
        }`}
      >
        {day.date.getDate()}
      </button>
      {label && (
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-normal leading-4 whitespace-nowrap ${isToday ? 'text-brand-default' : 'text-text-inverse'}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
