'use client';

import { TextareaHTMLAttributes, useRef, useEffect, useState } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  labelClassName?: string;
  disableFillStyle?: boolean;
}

export default function TextAreaField({
  label,
  required = false,
  className = '',
  labelClassName,
  disableFillStyle = false,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  ...props
}: TextAreaFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = typeof value === 'string' && value.trim().length > 0;

  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (onChange) onChange(e);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label
        className={`text-label1 font-medium ${labelClassName ?? 'text-text-default'}`}
      >
        {label} {required && <span className="text-brand-default">*</span>}
      </label>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleResizeHeight}
        disabled={disabled}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        rows={1}
        className={`w-full min-h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body placeholder:text-text-placeholder placeholder:font-normal transition-colors border outline-none resize-none overflow-hidden
        ${disabled ? 'text-text-placeholder' : 'text-text-default'} 
        ${
          isFilled && !disableFillStyle && !isFocused
            ? 'bg-background-subtle border-transparent'
            : 'bg-white border-border-strong focus:border-border-active'
        }`}
        {...props}
      />
    </div>
  );
}
