'use client';
// TODO: 팀원의 DialogModal 작업 완료 후, 기존 DialogModal에
// iconClassName, secondaryButton.variant prop을 추가하는 방식으로
// 이 컴포넌트(IllustDialogModal)와 통합 리팩토링 예정
import { FocusTrap } from 'focus-trap-react';
import { useEffect, useId } from 'react';

interface IllustDialogModalProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  primaryButton: {
    label: string;
    onClick: () => void;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
  children?: React.ReactNode;
}

export default function IllustDialogModal({
  icon,
  title,
  description,
  primaryButton,
  secondaryButton,
  onClose,
  children,
}: IllustDialogModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-background-dim z-modal flex items-center justify-center font-['Pretendard']"
      onClick={onClose}
      role="presentation"
    >
      <FocusTrap>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          className="w-80 rounded-2xl bg-background-default shadow-[0px_24px_38px_-10px_rgba(23,23,23,0.12),0px_10px_15px_-5px_rgba(23,23,23,0.10)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-5 pt-5 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2.25">
              <div className="flex items-center justify-center">{icon}</div>
              <div className="flex flex-col items-center gap-1 text-center self-stretch">
                <p
                  id={titleId}
                  className="text-headline3 font-semibold text-label-normal whitespace-pre-line"
                >
                  {title}
                </p>
                {description && (
                  <p
                    id={descriptionId}
                    className="text-label1 font-normal text-label-light whitespace-nowrap"
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {children && <div className="w-full px-5">{children}</div>}

          <div className="px-5 pt-4 pb-5 flex justify-center items-center gap-3">
            <button
              type="button"
              onClick={primaryButton.onClick}
              className="flex-1 h-11 px-6 py-3 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-default text-label1 font-semibold text-text-default"
            >
              {primaryButton.label}
            </button>
            {secondaryButton && (
              <button
                type="button"
                onClick={secondaryButton.onClick}
                className="flex-1 h-11 px-6 py-3 bg-brand-default rounded-lg text-label1 font-semibold text-text-inverse"
              >
                {secondaryButton.label}
              </button>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
