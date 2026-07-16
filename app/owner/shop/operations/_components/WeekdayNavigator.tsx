'use client';

import ChevronIcon from '@/public/icons/icon-right_chevron.svg';
import type { DayOfWeek } from './WeekdayTabs';

const WEEKDAYS: { value: DayOfWeek; label: string }[] = [
  { value: 'MONDAY', label: '월요일' },
  { value: 'TUESDAY', label: '화요일' },
  { value: 'WEDNESDAY', label: '수요일' },
  { value: 'THURSDAY', label: '목요일' },
  { value: 'FRIDAY', label: '금요일' },
  { value: 'SATURDAY', label: '토요일' },
  { value: 'SUNDAY', label: '일요일' },
];

interface WeekdayNavigatorProps {
  selectedDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
}

export default function WeekdayNavigator({
  selectedDay,
  onSelectDay,
}: WeekdayNavigatorProps) {
  const currentIndex = WEEKDAYS.findIndex((d) => d.value === selectedDay);
  const currentLabel = WEEKDAYS[currentIndex]?.label ?? '';

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + WEEKDAYS.length) % WEEKDAYS.length;
    onSelectDay(WEEKDAYS[prevIndex].value);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % WEEKDAYS.length;
    onSelectDay(WEEKDAYS[nextIndex].value);
  };

  return (
    <div className="self-stretch py-1 flex justify-center items-center gap-3 font-['Pretendard'] mb-2">
      <button type="button" onClick={goToPrevious} aria-label="이전 요일">
        <ChevronIcon className="size-4 pl-2 rotate-180 text-text-subtlest" />
      </button>
      <span className="text-text-default text-headline3 font-semibold">
        {currentLabel}
      </span>
      <button type="button" onClick={goToNext} aria-label="다음 요일">
        <ChevronIcon className="size-4 pl-2 text-text-subtlest" />
      </button>
    </div>
  );
}
