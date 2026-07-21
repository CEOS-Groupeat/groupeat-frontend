'use client';

import { InputHTMLAttributes, useState } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  labelClassName?: string;
  inputClassName?: string;
}

export default function OwnerInputField({
  label,
  required = false,
  className = '',
  value,
  labelClassName,
  inputClassName,
  disabled,
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = typeof value === 'string' && value.trim().length > 0;

  // 포커스 중일 때는 값이 있어도 filled 스타일 적용 안 함 (blur 후에만 적용)
  const isFilled = hasValue && !isFocused;

  return (
    <div className={`${className || 'w-full'} flex flex-col gap-2`}>
      {/* 라벨 영역 */}
      {label && (
        <label
          className={`text-label1 font-medium ${labelClassName ?? 'text-text-default'}`}
        >
          {label} {required && <span className="text-brand-default">*</span>}
        </label>
      )}

      <input
        value={value}
        disabled={disabled}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        className={`w-full h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body placeholder:text-text-placeholder transition-colors border outline-none 
        [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-text-default)]
[&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]
[&:-webkit-autofill]:!border-border-strong
          ${disabled ? 'text-text-placeholder' : 'text-text-default'} ${
            isFilled
              ? 'bg-background-subtle border-transparent'
              : 'bg-white border-border-strong'
          } ${inputClassName ?? ''}`}
        {...props}
      />
    </div>
  );
}
