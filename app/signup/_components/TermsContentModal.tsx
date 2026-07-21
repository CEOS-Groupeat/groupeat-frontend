'use client';

import Close from '@/public/icons/icon_close.svg';
import TermsViewer from '@/components/ui/TermsViewer';

interface TermsContentModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function TermsContentModal({
  title,
  content,
  onClose,
}: TermsContentModalProps) {
  return (
    <div className="app-container inset-0 z-modal flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-background-dim/50 animate-in fade-in duration-200 cursor-default"
      />

      <div className="relative w-full max-w-sm max-h-[70vh] bg-white rounded-xl flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border-subtle">
          <h2 className="text-body font-semibold text-text-default">
            {title}
          </h2>
          <button type="button" onClick={onClose}>
            <Close className="size-6 text-text-placeholder" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <TermsViewer content={content} />
        </div>
      </div>
    </div>
  );
}
