'use client';

interface SubmitButtonProps {
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

export default function SubmitButton({
  label = '수정하기',
  disabled,
  isLoading,
  onClick,
}: SubmitButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-5 pt-4 pb-5 bg-gradient-to-b from-white/0 to-white/90 font-['Pretendard']">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`w-full h-12 px-12 py-3 rounded-xl text-body font-semibold transition ${
          disabled || isLoading
            ? 'bg-background-subtlest text-text-subtlest'
            : 'bg-brand-default text-text-inverse'
        }`}
      >
        {isLoading ? '처리 중...' : label}
      </button>
    </div>
  );
}
