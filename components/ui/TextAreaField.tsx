'use client';

import { TextareaHTMLAttributes, useRef, useEffect } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  labelClassName?: string;
}

export default function TextAreaField({
  label,
  required = false,
  className = '',
  labelClassName,
  value,
  onChange,
  ...props
}: TextAreaFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      <label className={`text-label1 font-medium ${labelClassName ?? 'text-text-default'}`}>
        {label} {required && <span className="text-brand-default">*</span>}
      </label>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleResizeHeight}
        rows={1}
        className={`w-full min-h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body text-text-default placeholder:text-text-placeholder transition-colors resize-none overflow-hidden ${
          isFilled
            ? 'bg-background-subtle outline-none border-none'
            : 'bg-white outline-1 outline-offset-1 outline-border-strong'
        }`}
        {...props}
      />
    </div>
  );
}