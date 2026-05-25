'use client';

import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import type { DayButtonProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
// ✅ 제거: import 'react-day-picker/style.css' → 홈 페이지 달력 버그 원인

// ─── 시간 슬롯 ────────────────────────────────────────
const AM_SLOTS = ['10:00', '10:30', '11:00', '11:30'];
const PM_SLOTS = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
];

// ─── 포맷 헬퍼 ───────────────────────────────────────
export function formatPickupDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function formatPickupTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${hour}:${String(m).padStart(2, '0')}`;
}

// ─── 커스텀 날짜 버튼 — "오늘" 레이블 포함 ──────────
function CustomDayButton({
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

// ─── Props ───────────────────────────────────────────
interface DateFilterProps {
  date: string | undefined;
  time: string | undefined;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateFilter({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateFilterProps) {
  const timeRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ✅ 월 탐색 상태 직접 관리 → 화살표 가운데 정렬 가능
  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const selectedDate = date ? new Date(date) : undefined;

  // ── 이전 달 버튼 비활성 (현재 달 이전 불가) ──
  const isPrevDisabled =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() === today.getMonth();

  const goPrevMonth = () =>
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1));
  const goNextMonth = () =>
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1));

  // ── 날짜 선택 → 시간 섹션으로 스크롤 ──
  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return;
    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, '0');
    const dd = String(day.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);

    setTimeout(() => {
      timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // ── 오늘이면 현재 시간 이전 슬롯 비활성 ──
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

  // ✅ grid grid-cols-4 로 항상 4개 고정
  const renderSlot = (slot: string) => {
    const disabled = isSlotDisabled(slot);
    const active = time === slot;
    const [h, m] = slot.split(':').map(Number);
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const label = `${displayH}:${String(m).padStart(2, '0')}`;

    return (
      <button
        key={slot}
        type="button"
        disabled={disabled || !date}
        onClick={() => onTimeChange(slot)}
        className={`h-10 rounded-lg text-xs transition-colors ${
          active
            ? 'bg-brand-default text-text-inverse font-semibold'
            : disabled || !date
              ? 'bg-background-subtlest text-text-subtlest cursor-not-allowed outline outline-1'
              : 'bg-background-default outline outline-1 outline-border-default text-text-default hover:bg-background-subtle'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="mt-3 flex flex-col gap-6">
      {/* ── 캘린더 ── */}
      <div className="flex flex-col gap-2">
        {/* ✅ 커스텀 네비게이션 — flex justify-center 로 가운데 정렬 */}
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
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path
                d="M5 1L1 5L5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path
                d="M1 1L5 5L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 캘린더 그리드 */}
        <div className="w-full px-3 pt-3 pb-5 bg-background-default rounded-2xl outline outline-1 outline-border-default">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            disabled={{ before: today }}
            month={viewMonth}
            onMonthChange={setViewMonth}
            hideNavigation // ✅ 내장 nav 숨김 → 커스텀 nav 사용
            locale={ko}
            formatters={{
              formatWeekdayName: (weekday) =>
                ['일', '월', '화', '수', '목', '금', '토'][weekday.getDay()],
            }}
            components={{ DayButton: CustomDayButton }}
            classNames={{
              root: 'w-full',
              months: 'w-full',
              month: 'w-full',
              month_caption: 'hidden', // ✅ 내장 캡션 숨김 (커스텀 nav에서 처리)
              month_grid: 'w-full',
              weekdays: 'flex',
              weekday: 'flex-1 text-center text-xs text-text-subtlest py-1',
              weeks: 'flex flex-col gap-px',
              week: 'flex gap-0.5',
              day: 'flex-1 flex justify-center',
              day_button: 'size-10',
              selected: '',
              today: '',
              disabled: '',
              outside: '',
            }}
          />
        </div>
      </div>

      {/* ── 픽업 시간 ── */}
      <div ref={timeRef} className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold text-text-default">
            픽업 시간
          </span>
          <span className="text-xs text-text-subtlest">*선택</span>
        </div>

        {!date && (
          <p className="text-sm text-text-placeholder">
            날짜를 먼저 선택해 주세요
          </p>
        )}

        {date && (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-text-default">
                오전
              </span>
              {/* ✅ grid-cols-4 → 항상 4개 고정, 너비 자동 균등 */}
              <div className="grid grid-cols-4 gap-2">
                {AM_SLOTS.map(renderSlot)}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-text-default">
                오후
              </span>
              <div className="grid grid-cols-4 gap-2">
                {PM_SLOTS.map(renderSlot)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
