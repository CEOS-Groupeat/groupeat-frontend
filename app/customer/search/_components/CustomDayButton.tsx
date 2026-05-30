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
    <div className="relative flex flex-col items-center pb-4">
      <button
        {...props}
        onClick={onClick}
        disabled={isDisabled || isOutside}
        className={`size-10 rounded-lg flex justify-center items-center text-base transition-colors ${
          isSelected
            ? 'bg-brand-default text-white'
            : isDisabled || isOutside
              ? 'text-text-placeholder cursor-not-allowed'
              : 'text-text-default hover:bg-background-subtle'
        }`}
      >
        {day.date.getDate()}
      </button>
      {isToday && (
        <span className="absolute bottom-0 text-[9px] font-medium text-brand-default leading-4">
          오늘
        </span>
      )}
    </div>
  );
}
