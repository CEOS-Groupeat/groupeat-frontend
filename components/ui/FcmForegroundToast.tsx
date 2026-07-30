'use client';

import BellIcon from '@/public/icons/icon_bell_active.svg';

interface FcmForegroundToastProps {
  title: string;
  body: string;
  onClose: () => void;
}

export default function FcmForegroundToast({
  title,
  body,
  onClose,
}: FcmForegroundToastProps) {
  return (
    <div className="app-container top-3 z-toast flex justify-center px-4">
      <div className="relative max-w-full w-full flex items-start gap-3 p-3.5 bg-white rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.12)] border border-border-subtle animate-in fade-in slide-in-from-top-4 duration-300">
        <button
          type="button"
          onClick={onClose}
          className="flex items-start gap-3 flex-1 text-left"
        >
          <div className="size-9 flex items-center justify-center rounded-full bg-brand-background shrink-0">
            <BellIcon className="size-5 text-brand-default shrink-0" />
          </div>
          <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
            <p className="text-label1 font-semibold text-text-default truncate w-full">
              {title}
            </p>
            <p className="text-label2 text-text-subtle line-clamp-2">{body}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
