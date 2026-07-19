'use client';

import { useRef, useState, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import StoreCustomDayButton from '@/app/customer/store/[storeId]/_components/StoreCustomDayButton';

import PrevMonth from '@/public/icons/icon_calendarButton_left.svg';
import NextMonth from '@/public/icons/icon_calendarButton_right.svg';
import AlertIcon from '@/public/icons/icon_alert.svg';
import StatusError from '@/public/icons/icon_status_error.svg'; // 💡 에러 아이콘 임포트

interface DateFilterProps {
  date: string | undefined;
  times: string[];
  availableTimes?: string[];
  minOrderDays?: number;
  closedDays?: string;
  scheduleStartDate?: string;
  scheduleEndDate?: string;
  onDateChange: (date: string) => void;
  onTimeChange: (times: string[]) => void;
}

export default function StoreDateFilter({
  date,
  times,
  availableTimes = [],
  minOrderDays,
  closedDays,
  scheduleStartDate,
  scheduleEndDate,
  onDateChange,
  onTimeChange,
}: DateFilterProps) {
  const timeRef = useRef<HTMLDivElement>(null);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const closedDaySet = useMemo(() => {
    return new Set((closedDays ?? '').split(',').filter(Boolean));
  }, [closedDays]);

  const dayOfWeekMap = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  const isClosedDay = (day: Date): boolean => {
    const dayName = dayOfWeekMap[day.getDay()];
    return closedDaySet.has(dayName);
  };

  const isOutOfSchedule = (day: Date): boolean => {
    if (scheduleStartDate) {
      const start = new Date(scheduleStartDate);
      start.setHours(0, 0, 0, 0);
      if (day < start) return true;
    }
    if (scheduleEndDate) {
      const end = new Date(scheduleEndDate);
      end.setHours(0, 0, 0, 0);
      if (day > end) return true;
    }
    return false;
  };

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const selectedDate = date ? new Date(date) : undefined;

  const isPrevDisabled =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() === today.getMonth();

  const goPrevMonth = () =>
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1));
  const goNextMonth = () =>
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1));

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return;

    if (isClosedDay(day)) {
      setErrorMessage('휴무일에는 주문할 수 없어요');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    if (isOutOfSchedule(day)) {
      setErrorMessage('운영 기간이 아니에요');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const minAllowedDate = new Date(today);
    minAllowedDate.setDate(today.getDate() + minOrderDays!);

    if (day < minAllowedDate) {
      setErrorMessage('최소 주문 기한을 확인해주세요');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, '0');
    const dd = String(day.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);

    setTimeout(() => {
      timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const isSlotDisabled = (slot: string): boolean => {
    if (!date) return false;
    const selected = new Date(date);
    if (selected.getTime() > today.getTime()) return false;
    const [h, m] = slot.split(':').map(Number);
    const now = new Date();
    return (
      h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())
    );
  };

  const renderSlot = (slot: string) => {
    const disabled = isSlotDisabled(slot);
    const active = times.includes(slot);
    const [h, m] = slot.split(':').map(Number);
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const label = `${displayH}:${String(m).padStart(2, '0')}`;

    return (
      <button
        key={slot}
        type="button"
        disabled={disabled || !date}
        onClick={() => {
          const updatedTimes = active
            ? times.filter((t) => t !== slot)
            : [...times, slot];
          onTimeChange(updatedTimes);
        }}
        className={`h-10 rounded-lg text-xs transition-colors ${
          active
            ? 'bg-brand-default text-text-inverse'
            : disabled || !date
              ? 'bg-background-subtlest text-text-subtlest cursor-not-allowed outline outline-1'
              : 'bg-background-default outline outline-1 outline-border-default text-text-default hover:bg-background-subtle'
        }`}
      >
        {label}
      </button>
    );
  };

  const amSlots = useMemo(() => {
    return availableTimes.filter((time) => {
      const [h] = time.split(':').map(Number);
      return h < 12;
    });
  }, [availableTimes]);

  const pmSlots = useMemo(() => {
    return availableTimes.filter((time) => {
      const [h] = time.split(':').map(Number);
      return h >= 12;
    });
  }, [availableTimes]);

  return (
    <div className="flex flex-col gap-6 relative">
      {showError && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex w-fit pl-3 pr-4 py-1.5 justify-center items-center gap-1 rounded-full bg-background-toast/52 backdrop-blur-[32px] z-toast animate-in fade-in slide-in-from-bottom-5 duration-300">
          <StatusError className="shrink-0" />
          <p className="text-label1 text-text-inverse whitespace-nowrap">
            {errorMessage}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            onClick={goPrevMonth}
            disabled={isPrevDisabled}
            className={`p-2 rounded-full transition-colors ${
              isPrevDisabled
                ? 'cursor-not-allowed opacity-30'
                : 'hover:bg-background-subtle'
            }`}
            aria-label="이전 달"
          >
            <PrevMonth className="shrink-0" />
          </button>

          <span className="text-lg font-medium text-text-default">
            {viewMonth.getFullYear()}.{' '}
            {String(viewMonth.getMonth() + 1).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={goNextMonth}
            className="p-2 rounded-full hover:bg-background-subtle transition-colors"
            aria-label="다음 달"
          >
            <NextMonth className="shrink-0" />
          </button>
        </div>

        <div className="w-full px-3 pt-3 pb-5 bg-background-default rounded-2xl outline outline-1 outline-border-default">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            disabled={[{ before: today }, isClosedDay, isOutOfSchedule]}
            month={viewMonth}
            onMonthChange={setViewMonth}
            hideNavigation
            locale={ko}
            formatters={{
              formatWeekdayName: (weekday) =>
                ['일', '월', '화', '수', '목', '금', '토'][weekday.getDay()],
            }}
            components={{ DayButton: StoreCustomDayButton }}
            classNames={{
              root: 'w-full',
              months: 'w-full',
              month: 'w-full',
              month_caption: 'hidden',
              month_grid: 'w-full',
              weekdays: 'flex',
              weekday: 'flex-1 text-center text-xs text-text-subtlest py-1',
              weeks: 'flex flex-col gap-px',
              week: 'flex gap-0.5',
              day: 'flex-1 flex justify-center',
              day_button: 'size-10',
              selected: '',
              today: 'text-brand-default',
              disabled: '',
              outside: '',
            }}
          />
        </div>

        <div className="flex items-center gap-1 mt-1">
          <AlertIcon className="w-4 h-4 text-icon-subtlest" />
          <p className="text-label2 text-text-subtlest">
            최소 {minOrderDays}일 전부터 주문 가능해요
          </p>
        </div>
      </div>

      {date && (
        <div
          ref={timeRef}
          className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-default">오전</span>
            <div className="grid grid-cols-4 gap-2">
              {amSlots.map(renderSlot)}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-default">오후</span>
            <div className="grid grid-cols-4 gap-2">
              {pmSlots.map(renderSlot)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
