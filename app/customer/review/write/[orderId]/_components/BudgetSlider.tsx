'use client';

import * as Slider from '@radix-ui/react-slider';

const MIN = 3000;
const MAX = 30000;
const STEP = 1000;

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function formatBudget(v: number): string {
  return v >= MAX ? '30,000원~' : `${v.toLocaleString()}원`;
}

export default function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end w-full font-['Pretendard']">
        <span className="text-headline2 font-semibold text-text-default">
          {formatBudget(value)}
        </span>
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-5"
        min={MIN}
        max={MAX}
        step={1000}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      >
        <Slider.Track className="relative h-2 w-full rounded-full bg-background-subtlest">
          <Slider.Range className="absolute h-full rounded-full bg-brand-default" />
        </Slider.Track>
        <Slider.Thumb className="block size-5 rounded-full bg-brand-default cursor-pointer touch-none outline-none focus:outline-none" />
      </Slider.Root>

      <div className="mt-0.5 flex justify-between font-medium text-caption2 text-text-subtlest">
        <span>3,000</span>
        <span>30,000~</span>
      </div>
    </div>
  );
}
