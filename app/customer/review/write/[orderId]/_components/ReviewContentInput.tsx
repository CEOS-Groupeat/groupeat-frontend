'use client';

import { useRef, useEffect, useState } from 'react';

const MAX_LENGTH = 1000;

interface ReviewContentInputProps {
  value: string;
  onChange: (content: string) => void;
}

export default function ReviewContentInput({
  value,
  onChange,
}: ReviewContentInputProps) {
  const [isEditing, setIsEditing] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    textarea.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [value, isEditing]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isEditing) {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (value.trim().length > 0) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // 작성 완료 상태
  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={handleEdit}
        className="w-full min-h-25 px-4 py-3 rounded-lg bg-background-subtle text-left flex flex-start"
      >
        <span className="font-['Pretendard'] text-body font-normal text-text-default whitespace-pre-line">
          {value}
        </span>
      </button>
    );
  }

  // 작성 중 상태
  return (
    <div className="relative w-full min-h-25 px-4 py-3 rounded-lg outline outline-1 outline-offset-[-1px] bg-background-default outline-border-strong transition-colors">
      {!value && (
        <p className="absolute top-3 left-4 right-4 pointer-events-none break-words font-['Pretendard'] text-body font-normal text-text-placeholder whitespace-pre-line">
          가게나 메뉴에 대해 만족스러웠던 점이나,{'\n'}픽업·주문에 대해
          남겨주세요.
        </p>
      )}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        onBlur={handleBlur}
        rows={1}
        className="w-full resize-none outline-none overflow-hidden break-words font-['Pretendard'] text-body font-normal text-text-default relative bg-transparent"
      />
    </div>
  );
}
