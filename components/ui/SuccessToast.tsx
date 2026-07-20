'use client';

import IconCheckSuccess from '@/public/icons/icon_check_success.svg';

interface SuccessToastProps {
  text: string;
  bottom?: number;
}

export default function SuccessToast({ text, bottom }: SuccessToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ bottom: `${bottom}px` }}
      className="app-container flex justify-center pointer-events-none"
    >
      <div className="pl-3 pr-4 py-1.5 rounded-full bg-background-toast/52 backdrop-blur-[32px] flex justify-center items-center overflow-hidden z-toast animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
        <div className="flex items-center gap-1">
          <IconCheckSuccess className="size-4.5 shrink-0" />
          <p className="px-0.5 py-1 text-text-inverse text-label1 font-normal font-['Pretendard'] whitespace-nowrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
