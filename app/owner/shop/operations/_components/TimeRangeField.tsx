'use client';

import { useState, useRef } from 'react';
import TimeScrollDropdown from './TimeScrollDropdown';
import { useTimeDropdownStore } from '@/store/useTimeDropdownStore';

interface TimeRangeFieldProps {
  label: string;
  timeRange: { startTime: string; endTime: string } | null;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onAdd: () => void;
  onRemove: () => void;
}

export default function TimeRangeField({
  label,
  timeRange,
  onStartChange,
  onEndChange,
  onAdd,
  onRemove,
}: TimeRangeFieldProps) {
  const setIsDropdownOpen = useTimeDropdownStore((state) => state.setIsOpen);

  const hasTimeRange = timeRange !== null;
  const [openDropdown, setOpenDropdown] = useState<'start' | 'end' | null>(
    null
  );
  const [dropdownTop, setDropdownTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = (which: 'start' | 'end') => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom + 16);
    }
    setOpenDropdown((prev) => {
      const next = prev === which ? null : which;
      setIsDropdownOpen(next !== null);
      return next;
    });
  };

  return (
    <div className="flex flex-col justify-center items-start gap-2 font-['Pretendard']">
      <span className="text-text-subtle text-label2 font-normal">{label}</span>
      <div className="relative w-full flex justify-start items-start gap-2">
        <div className="flex-1 flex justify-start items-center gap-2">
          <div
            ref={containerRef}
            className="flex-1 h-11 pl-4 pr-3 py-3 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong flex justify-start items-center"
          >
            <div className="flex-1 flex justify-center items-center gap-6">
              {hasTimeRange ? (
                <>
                  <div className="w-20 text-center">
                    <button
                      type="button"
                      onClick={() => handleOpenDropdown('start')}
                      className="w-full text-center text-text-default text-body font-medium font-['Pretendard'] leading-6"
                    >
                      {timeRange.startTime.slice(0, 5)}
                    </button>
                    {openDropdown === 'start' && (
                      <TimeScrollDropdown
                        key="start"
                        value={timeRange.startTime}
                        top={dropdownTop}
                        onApply={(value) => {
                          onStartChange(value);
                          setOpenDropdown(null);
                          setIsDropdownOpen(false);
                        }}
                        onClose={() => {
                          setOpenDropdown(null);
                          setIsDropdownOpen(false);
                        }}
                      />
                    )}
                  </div>
                  <span className="text-text-subtlest text-base font-normal">
                    -
                  </span>
                  <div className="relative w-20 text-center">
                    <button
                      type="button"
                      onClick={() => handleOpenDropdown('end')}
                      className="w-full text-center text-text-default text-base font-medium font-['Pretendard'] leading-6"
                    >
                      {timeRange.endTime.slice(0, 5)}
                    </button>
                    {openDropdown === 'end' && (
                      <TimeScrollDropdown
                        key="end"
                        value={timeRange.endTime}
                        top={dropdownTop}
                        onApply={(value) => {
                          onEndChange(value);
                          setOpenDropdown(null);
                          setIsDropdownOpen(false);
                        }}
                        onClose={() => {
                          setOpenDropdown(null);
                          setIsDropdownOpen(false);
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="w-20 text-center text-text-placeholder text-body font-normal">
                    시간 : 분
                  </span>
                  <span className="text-text-subtlest text-body font-normal">
                    -
                  </span>
                  <span className="w-20 text-center text-text-placeholder text-body font-normal">
                    시간 : 분
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {hasTimeRange ? (
          <button
            type="button"
            onClick={onRemove}
            className="h-11 px-4 py-3 bg-background-subtle rounded-lg flex justify-center items-center overflow-hidden"
          >
            <span className="text-center text-text-subtlest text-label1 font-medium">
              수정
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="h-11 px-4 py-3 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong flex justify-center items-center overflow-hidden"
          >
            <span className="text-center text-text-default text-label1 font-medium">
              추가
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
