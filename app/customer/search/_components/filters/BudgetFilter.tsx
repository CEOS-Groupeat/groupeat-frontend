'use client';

import { useState } from 'react';

const MIN = 3000;
const MAX = 30000;
const STEP = 1000;

interface BudgetFilterProps {
  value: number | undefined;
  onChange: (value: number) => void;
  onConfirm: () => void;
}

export function formatBudget(v: number): string {
  return v >= MAX ? '30,000원~' : `${v.toLocaleString()}원`;
}

export default function BudgetFilter({ value, onChange }: BudgetFilterProps) {
  const current = value ?? MIN;
  const isMax = current >= MAX;

  // 직접입력 상태
  const [showDirect, setShowDirect] = useState(false);
  const [directInput, setDirectInput] = useState('');

  const percentage = ((current - MIN) / (MAX - MIN)) * 100;

  // ── 슬라이더 변경 → 즉시 반영 ──
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
    setShowDirect(false);
  };

  // ── 직접입력 확정 ──
  const handleDirectConfirm = () => {
    const num = parseInt(directInput.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num) && num >= MIN) {
      onChange(Math.min(num, MAX));
    }
    setShowDirect(false);
    setDirectInput('');
  };

  return (
    <div className="mt-3 flex flex-col items-end gap-1 pb-3">
      {/* ── 값 표시 영역 ── */}
      <div className="flex flex-col items-end gap-1 w-full">
        {/* 직접입력 링크 — 최대값일 때만 표시 */}
        {isMax && !showDirect && (
          <button
            type="button"
            onClick={() => {
              setShowDirect(true);
              setDirectInput('');
            }}
            className="text-xs font-medium text-text-subtlest underline"
          >
            직접입력
          </button>
        )}

        {/* 직접입력 인풋 */}
        {showDirect ? (
          <input
            type="number"
            inputMode="numeric"
            value={directInput}
            onChange={(e) => setDirectInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDirectConfirm();
            }}
            onBlur={handleDirectConfirm}
            placeholder="금액을 입력하세요"
            className="text-right text-xl font-semibold text-text-default w-full
              bg-transparent outline-none border-b border-border-strong pb-0.5"
            autoFocus
          />
        ) : (
          <span className="text-xl font-semibold text-text-default">
            {formatBudget(current)}
          </span>
        )}
      </div>

      {/* ── 슬라이더 ── */}
      <div className="w-full flex flex-col gap-0.5">
        <div className="relative h-5 flex items-center w-full">
          {/* 트랙 배경 (미채움) */}
          <div className="absolute w-full h-2 rounded-full bg-background-subtlest" />
          {/* 트랙 채움 (brand) */}
          <div
            className="absolute h-2 rounded-full bg-brand-default pointer-events-none"
            style={{ width: `${percentage}%` }}
          />
          {/* 네이티브 input — 투명, 위에 레이어 */}
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={current}
            onChange={handleSlider}
            className="absolute w-full cursor-pointer appearance-none bg-transparent
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:size-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-brand-default
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:relative
              [&::-webkit-slider-thumb]:z-10
              [&::-moz-range-thumb]:size-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-brand-default
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>

        {/* min / max 레이블 */}
        <div className="flex justify-between">
          <span className="text-xs font-medium text-text-subtlest">3,000</span>
          <span className="text-xs font-medium text-text-subtlest">
            30,000~
          </span>
        </div>
      </div>
    </div>
  );
}
