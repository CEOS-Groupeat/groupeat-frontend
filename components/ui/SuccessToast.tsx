'use client';

import IconCheckSuccess from '@/public/icons/icon_check_success.svg';

interface SuccessToastProps {
  text: string;
}

export default function SuccessToast({ text }: SuccessToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pl-3 pr-4 py-1.5 rounded-full bg-background-toast/52 backdrop-blur-[32px] flex justify-center items-center overflow-hidden fixed bottom-[90px] left-1/2 -translate-x-1/2 z-toast animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-center gap-1">
        <IconCheckSuccess className="size-4.5 shrink-0" />
        <p className="px-0.5 py-1 text-text-inverse text-label1 font-normal font-['Pretendard'] whitespace-nowrap">
          {text}
        </p>
      </div>
    </div>
  );
}
