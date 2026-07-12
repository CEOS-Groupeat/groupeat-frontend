'use client';

import { useState, useRef, useEffect } from 'react';

interface HeadcountInputProps {
  value: number | null;
  onChange: (headcount: number | null) => void;
}

export default function HeadcountInput({
  value,
  onChange,
}: HeadcountInputProps) {
  const [input, setInput] = useState(value ? String(value) : '');
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  const handleConfirm = () => {
    const num = parseInt(input, 10);
    if (!input || isNaN(num) || num <= 0) return;
    onChange(num);
  };

  const handleEdit = () => {
    setInput(value ? String(value) : '');
    onChange(null);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (value === null) {
      inputRef.current?.focus();
    }
  }, [value]);

  if (value !== null) {
    return (
      <button
        type="button"
        onClick={handleEdit}
        className="w-full h-11 pl-4 pr-3 py-3 rounded-lg flex items-center bg-background-subtle"
      >
        <span className="text-body text-text-default font-normal">
          {value}명
        </span>
      </button>
    );
  }

  return (
    <div className="w-full h-11 rounded-lg flex items-center outline outline-1 outline-offset-[-1px] outline-border-strong font-['Pretendard']">
      <input
        ref={inputRef}
        type="number"
        inputMode="numeric"
        placeholder="인원 입력"
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleConfirm();
        }}
        onBlur={handleConfirm}
        className="flex-1 h-full pl-4 outline-none font-normal text-body text-text-default placeholder:text-body placeholder:text-text-placeholder placeholder:font-normal"
      />
      {input && (
        <span className="pr-3 text-body text-text-subtlest font-normal">
          명
        </span>
      )}
    </div>
  );
}
