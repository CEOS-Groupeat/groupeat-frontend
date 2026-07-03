'use client';

import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export default function InputField({
  label,
  required = false,
  className = '',
  value,
  ...props
}: InputFieldProps) {
  const isFilled = typeof value === 'string' && value.trim().length > 0;

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {/* 라벨 영역 */}
      <label className="text-label1 text-text-default font-medium">
        {label} {required && <span className="text-brand-default">*</span>}
      </label>

      {/* 입력 영역 */}
      <input
        value={value}
        className={`w-full h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body text-text-default placeholder:text-text-placeholder transition-colors  ${
          isFilled
            ? 'bg-background-subtle outline-none border-none'
            : 'bg-white outline-1 outline-offset-1 outline-border-strong'
        }`}
        {...props}
      />
    </div>
  );
}
