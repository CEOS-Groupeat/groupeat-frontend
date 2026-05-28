import React, { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  showOptional?: boolean;
  errorMessage?: string;
}

export default function TextField({
  label,
  required = false,
  showOptional = false,
  className = '',
  errorMessage,
  ...props // name, value, onChange, type 등 나머지 모든 input 속성
}: TextFieldProps) {
  const borderColorClass = errorMessage
    ? 'border-status-danger focus:border-status-danger'
    : 'border-border-default focus:border-border-active';
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 라벨 및 필수/선택 표시 영역 */}
      <label className="text-label1 text-text-default font-medium">
        {label} {required && <span className="text-brand-default">*</span>}
        {showOptional && !required && (
          <span className="text-text-subtlest font-normal text-caption1 ml-1">
            (선택)
          </span>
        )}
      </label>

      {/* 실제 입력 필드 */}
      <input
        className={`w-full h-11 pl-4 pr-3 py-3 rounded-lg border border-px border-border-default placeholder:text-body placeholder:text-text-placeholder focus:outline-none focus:border-border-active ${borderColorClass} ${className}`}
        {...props}
      />

      {errorMessage && (
        <p className="text-brand-default text-caption1 font-medium -mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
