'use client';

import type { EventType } from '../_types/reviewWrite.type';

const EVENT_TYPES: EventType[] = ['강연', '세미나', '워크숍', '소모임'];

interface EventTypeSelectorProps {
  value: EventType | null;
  onChange: (eventType: EventType) => void;
}

export default function EventTypeSelector({
  value,
  onChange,
}: EventTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 font-['Pretendard']">
      {EVENT_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`flex-1 w-[80px] px-2.5 py-3 rounded-lg text-label1 ${
            value === type
              ? 'font-semibold bg-brand-background text-brand-default'
              : 'font-medium outline outline-1 outline-offset-[-1px] outline-border-strong text-text-default'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
