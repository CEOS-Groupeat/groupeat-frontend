'use client';

import { useState, useRef, useEffect } from 'react';

interface TimeScrollDropdownProps {
  value: string;
  top: number;
  onApply: (value: string) => void;
  onClose: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

export default function TimeScrollDropdown({
  value,
  top,
  onApply,
  onClose,
}: TimeScrollDropdownProps) {
  const [initialHour, initialMinute] = value
    ? value.split(':').map(Number)
    : [0, 0];

  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hourRef.current
      ?.querySelector(`[data-value="${initialHour}"]`)
      ?.scrollIntoView({ block: 'center' });
    minuteRef.current
      ?.querySelector(`[data-value="${initialMinute}"]`)
      ?.scrollIntoView({ block: 'center' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectHour = (h: number) => {
    setSelectedHour(h);
    hourRef.current
      ?.querySelector(`[data-value="${h}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSelectMinute = (m: number) => {
    setSelectedMinute(m);
    minuteRef.current
      ?.querySelector(`[data-value="${m}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleApply = () => {
    const h = String(selectedHour).padStart(2, '0');
    const m = String(selectedMinute).padStart(2, '0');
    onApply(`${h}:${m}`);
  };

  return (
    <>
      <div className="fixed inset-0 z-0" onClick={onClose} />
      <div
        className="absolute left-0 top-[60px] z-10 w-32 h-80 max-w-32 min-w-32 max-h-80 min-h-80 bg-background-default rounded-lg shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col font-['Pretendard']"
      >
        <div className="flex-1 px-2 flex min-h-0">
          {/* 시(Hour) */}
          <div
            ref={hourRef}
            className="flex-1 py-2 flex flex-col items-center gap-1 overflow-y-auto scrollbar-hide"
          >
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                data-value={h}
                onClick={() => handleSelectHour(h)}
                className={`self-stretch py-2 rounded-l-lg flex justify-center items-center text-text-default text-base font-normal leading-6 tracking-tight ${
                  h === selectedHour ? 'bg-text-subtlest/10' : ''
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          {/* 분(Minute) */}
          <div
            ref={minuteRef}
            className="flex-1 py-2 flex flex-col items-center gap-1 overflow-y-auto scrollbar-hide"
          >
            {MINUTES.map((m) => (
              <button
                key={m}
                type="button"
                data-value={m}
                onClick={() => handleSelectMinute(m)}
                className={`self-stretch py-2 rounded-r-lg flex justify-center items-center text-text-default text-base font-normal leading-6 tracking-tight ${
                  m === selectedMinute ? 'bg-text-subtlest/10' : ''
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 py-2.5 border-t border-border-divider flex justify-end items-center">
          <button
            type="button"
            onClick={handleApply}
            className="px-1.5 py-1 text-label1 font-semibold text-brand-default"
          >
            적용
          </button>
        </div>
      </div>
    </>
  );
}
