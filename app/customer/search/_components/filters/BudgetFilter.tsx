'use client';

import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const MIN = 3000;
const MAX = 30000;
const STEP = 1000;

interface BudgetFilterProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

export function formatBudget(v: number): string {
  return v >= MAX
    ? '30,000원~'
    : `${(Math.round(v / STEP) * STEP).toLocaleString()}원`;
}

export default function BudgetFilter({ value, onChange }: BudgetFilterProps) {
  const current = value ?? MIN;
  const isMax = current >= MAX;

  const [showDirect, setShowDirect] = useState(false);
  const [directInput, setDirectInput] = useState('');

  const handleDirectConfirm = () => {
    const num = parseInt(directInput, 10);
    if (!isNaN(num) && num >= MIN) {
      onChange(Math.min(num, MAX));
    }
    setShowDirect(false);
    setDirectInput('');
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-end gap-1 w-full font-['Pretendard']">
        {/* 직접입력 링크 — 최대값일 때만 표시 */}
        {isMax && !showDirect && (
          <button
            type="button"
            onClick={() => {
              setShowDirect(true);
              setDirectInput('');
            }}
            className="text-xs font-medium text-text-subtlest leading-4 underline"
          >
            {/* figma 상 custom font size/weight */}
            직접입력
          </button>
        )}
        {/* 직접입력 인풋 */}
        {showDirect ? (
          <input
            type="number"
            inputMode="numeric"
            value={directInput}
            onChange={(e) =>
              setDirectInput(e.target.value.replace(/[^0-9]/g, ''))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDirectConfirm();
            }}
            onBlur={handleDirectConfirm}
            placeholder="금액을 입력하세요"
            className="w-full h-11 pl-4 pr-3 py-3 rounded-lg
          outline outline-1 outline-offset-[-1px] outline-border-strong
          font-['Pretendard'] font-normal text-body text-text-default placeholder:text-text-placeholder placeholder:font-normal"
            autoFocus
          />
        ) : (
          <span className="text-heading2 font-semibold text-text-default">
            {formatBudget(current)}
          </span>
        )}
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-5"
        min={MIN}
        max={MAX}
        step={1}
        value={[current]}
        onValueChange={([v]) => onChange(v)}
      >
        <Slider.Track className="relative h-2 w-full rounded-full bg-background-subtlest">
          <Slider.Range className="absolute h-full rounded-full bg-brand-default" />
        </Slider.Track>
        <Slider.Thumb className="block size-5 rounded-full bg-brand-default cursor-pointer touch-none" />
      </Slider.Root>

      <div className="mt-0.5 flex justify-between font-medium font-['Pretendard'] text-caption2 text-text-subtlest">
        <span>3,000</span>
        <span>30,000~</span>
      </div>
    </div>
  );
}
