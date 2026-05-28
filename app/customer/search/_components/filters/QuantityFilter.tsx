'use client';

import { useState } from 'react';

interface QuantityFilterProps {
  value: number | undefined;
  onChange: (value: number) => void;
  onConfirm: () => void;
}

export default function QuantityFilter({
  value,
  onChange,
  onConfirm,
}: QuantityFilterProps) {
  const [input, setInput] = useState(value ? String(value) : '');

  const handleConfirm = () => {
    const num = parseInt(input, 10);
    if (!input || isNaN(num) || num <= 0) return;
    onChange(num);
    onConfirm(); // Enter → 토글 닫힘
  };

  // 선택 완료 상태 → bg-background-subtle 박스
  if (value !== undefined) {
    return (
      <div className="h-11 pl-4 pr-3 py-3 bg-background-subtle rounded-lg flex items-center mt-3">
        <span className="text-base text-text-default">{value}</span>
      </div>
    );
  }

  // 미선택 상태 → 숫자 input
  return (
    <div className="mt-3">
      <input
        type="number"
        inputMode="numeric"
        placeholder="수량을 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleConfirm();
        }}
        className="w-full h-11 pl-4 pr-3 py-3 bg-background-default rounded-lg
          outline outline-1 outline-border-strong
          text-base text-text-default placeholder:text-text-placeholder"
        autoFocus
      />
    </div>
  );
}
