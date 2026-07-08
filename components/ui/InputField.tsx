'use client';

import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  labelClassName?: string;
}

export default function InputField({
  label,
  required = false,
  className = '',
  value,
  labelClassName,
  disabled,
  ...props
}: InputFieldProps) {
  const isFilled = typeof value === 'string' && value.trim().length > 0;

  return (
    <div className={`${className || 'w-full'} flex flex-col gap-2`}>
      {/* 라벨 영역 */}
      <label
        className={`text-label1 font-medium ${labelClassName ?? 'text-text-default'}`}
      >
        {label} {required && <span className="text-brand-default">*</span>}
      </label>

      <input
        value={value}
        disabled={disabled}
        className={`w-full h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body placeholder:text-text-placeholder transition-colors border ${
          disabled ? 'text-text-placeholder' : 'text-text-default'
        } ${
          isFilled
            ? 'bg-background-subtle border-transparent'
            : 'bg-white border-border-strong'
        }`}
        {...props}
      />
    </div>
  );
}