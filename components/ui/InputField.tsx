'use client';

import { InputHTMLAttributes, useState } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  isFontWeightNormal?: boolean;
  isError?: boolean;
  errorMessage?: string;
  helperText?: React.ReactNode;
  disableFillStyle?: boolean;
}

export default function InputField({
  label,
  required = false,
  className = '',
  value,
  labelClassName,
  inputClassName,
  disabled,
  isFontWeightNormal,
  isError = false,
  errorMessage,
  helperText,
  disableFillStyle = false,
  type,
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled =
    value !== undefined && value !== null && String(value).trim().length > 0;

  return (
    <div className={`${className || 'w-full'} flex flex-col gap-2`}>
      {/* 라벨 영역 */}
      {label && (
        <label
          className={`text-label1 ${isFontWeightNormal ? '' : 'font-medium'} ${labelClassName ?? 'text-text-default'}`}
        >
          {label} {required && <span className="text-brand-default">*</span>}
        </label>
      )}

      <input
        type={type}
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
        className={`w-full h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body placeholder:text-text-placeholder placeholder:font-normal transition-colors border outline-none 
        [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
        [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.text-default)]
        ${disabled ? 'text-text-placeholder' : 'text-text-default'} 
        ${
          isError
            ? 'border-status-danger focus:border-status-danger'
            : isFilled && !disableFillStyle && !isFocused
              ? 'bg-background-subtle border-transparent'
              : 'bg-white border-border-strong focus:border-border-active'
        } ${
          type === 'number'
            ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            : ''
        } ${inputClassName ?? ''}`}
        {...props}
      />

      {isError && errorMessage ? (
        <p className="text-status-danger text-caption1 font-medium animate-in fade-in">
          {errorMessage}
        </p>
      ) : (
        helperText && <>{helperText}</>
      )}
    </div>
  );
}
