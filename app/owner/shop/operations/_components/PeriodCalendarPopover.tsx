'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import CustomDayButton from './CustomDayButton';
import PrevMonth from '@/public/icons/icon-datePicker-left.svg';
import NextMonth from '@/public/icons/icon-datePicker-right.svg';
import TriButton from '@/public/icons/icon_calendar-triButton.svg';

interface PeriodCalendarPopoverProps {
  initialStartDate?: string;
  initialEndDate?: string;
  onComplete: (startDate: string, endDate: string) => void;
  onClose: () => void;
}

function toDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function PeriodCalendarPopover({
  initialStartDate,
  initialEndDate,
  onComplete,
  onClose,
}: PeriodCalendarPopoverProps) {
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate ? new Date(initialStartDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialEndDate ? new Date(initialEndDate) : undefined
  );

  const goPrevMonth = () =>
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1));
  const goNextMonth = () =>
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1));

  const handleSelectDay = (day: Date | undefined) => {
    if (!day) return;
    if (step === 1) {
      setStartDate(day);
      setEndDate(undefined);
    } else {
      if (startDate && day < startDate) return;
      setEndDate(day);
    }
  };

  const handleNext = () => {
    if (!startDate) return;
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
    setEndDate(undefined);
  };

  const handleComplete = () => {
    if (!startDate || !endDate) return;
    onComplete(toDateString(startDate), toDateString(endDate));
  };

  return (
    <>
      <div className="fixed inset-0 z-0" onClick={onClose} />
      <div className="absolute top-[52px] left-0 z-10 my-2 w-[276px] bg-background-default rounded-xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col overflow-hidden font-['Pretendard']">
        <div className="pt-5 pb-2.5 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1 px-3 text-text-default text-base font-semibold leading-6 tracking-tight">
            <span>
              {viewMonth.getFullYear()}년 {viewMonth.getMonth() + 1}월
            </span>
            <TriButton />
          </div>
          <div className="flex items-center gap-4.5">
            <button
              type="button"
              onClick={goPrevMonth}
              className="pl-[9px] rounded-full hover:bg-background-subtle"
              aria-label="이전 달"
            >
              <PrevMonth className="size-4.5" />
            </button>
            <button
              type="button"
              onClick={goNextMonth}
              className="pr-[9px] rounded-full hover:bg-background-subtle"
              aria-label="다음 달"
            >
              <NextMonth className="size-4.5" />
            </button>
          </div>
        </div>

        <div className="px-3 flex-1 overflow-y-auto">
          <DayPicker
            mode="single"
            selected={step === 1 ? startDate : endDate}
            onSelect={handleSelectDay}
            month={viewMonth}
            onMonthChange={setViewMonth}
            hideNavigation
            showOutsideDays
            locale={ko}
            formatters={{
              formatWeekdayName: (weekday) =>
                ['월', '화', '수', '목', '금', '토', '일'][
                  (weekday.getDay() + 6) % 7
                ],
            }}
            components={{ DayButton: CustomDayButton }}
            classNames={{
              root: 'w-full',
              months: 'w-full',
              month: 'w-full',
              month_caption: 'hidden',
              month_grid: 'w-full',
              weekdays: 'flex px-3',
              weekday:
                'w-9 text-center text-caption2 font-medium text-text-subtlest py-[11px]',
              weeks: 'flex flex-col px-3 pt-0.5 pb-[14px]',
              week: 'flex',
              day: 'flex-1 flex justify-center',
            }}
          />
        </div>

        <div className="px-3 py-2.5 border-t border-border-divider flex justify-end items-center gap-2">
          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!startDate}
              className="px-1.5 py-1 text-label1 font-semibold text-brand-default disabled:text-text-disabled"
            >
              다음
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-1.5 py-1 text-label1 font-normal text-text-subtlest"
              >
                이전
              </button>
              <button
                type="button"
                onClick={handleComplete}
                disabled={!endDate}
                className="px-1.5 py-1 text-label1 font-semibold text-brand-default disabled:text-text-disabled"
              >
                완료
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
