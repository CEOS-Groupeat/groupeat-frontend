import type { DayButtonProps } from 'react-day-picker';

export default function CustomDayButton({
  day,
  modifiers,
  onClick,
  ...props
}: DayButtonProps) {
  const isToday = modifiers.today ?? false;
  const isSelected = modifiers.selected ?? false;
  const isDisabled = modifiers.disabled ?? false;
  const isOutside = modifiers.outside ?? false;

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
    </div>
  );
}
