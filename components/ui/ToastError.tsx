'use client';

import StatusError from '@/public/icons/icon_status_error.svg';

interface ToastErrorProps {
  text: string;
  bottom?: number;
}

export default function ToastError({ text, bottom = 80 }: ToastErrorProps) {
  return (
    <div
      style={{ bottom: `${bottom}px` }}
      className="fixed left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 flex justify-center z-toast pointer-events-none"
    >
      <div className="max-w-full flex pl-3 pr-4 py-1.5 items-center gap-1 rounded-full bg-background-toast/52 backdrop-blur-[32px] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
        <StatusError className="shrink-0" />
        <p className="text-label1 text-text-inverse">
          {text}
        </p>
      </div>
    </div>
  );
}