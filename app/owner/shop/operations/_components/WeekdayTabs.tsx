'use client';

import WeekdayTabButton from './WeekdayTabButton';

const WEEKDAYS = [
  { value: 'MONDAY', label: '월' },
  { value: 'TUESDAY', label: '화' },
  { value: 'WEDNESDAY', label: '수' },
  { value: 'THURSDAY', label: '목' },
  { value: 'FRIDAY', label: '금' },
  { value: 'SATURDAY', label: '토' },
  { value: 'SUNDAY', label: '일' },
] as const;

export type DayOfWeek = (typeof WEEKDAYS)[number]['value'];

interface WeekdayTabsProps {
  selectedDay: DayOfWeek;
  availableDays: DayOfWeek[]; // 주문 가능(available: true)한 요일 목록
  onSelectDay: (day: DayOfWeek) => void;
}

export default function WeekdayTabs({
  selectedDay,
  availableDays,
  onSelectDay,
}: WeekdayTabsProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-3 font-['Pretendard'] pb-4">
      <div className="self-stretch flex flex-col justify-center items-start gap-1">
        <span className="text-center text-text-default text-body font-medium">
          요일별 주문 관리
        </span>
        <span className="text-center text-text-subtlest text-caption1 font-normal">
          요일별로 주문 가능 여부와 영업시간을 설정해 주세요
        </span>
      </div>
      <div className="self-stretch flex justify-start items-center gap-1">
        {WEEKDAYS.map((day) => (
          <WeekdayTabButton
            key={day.value}
            label={day.label}
            isSelected={selectedDay === day.value}
            isAvailable={availableDays.includes(day.value)}
            onClick={() => onSelectDay(day.value)}
          />
        ))}
      </div>
    </div>
  );
}
