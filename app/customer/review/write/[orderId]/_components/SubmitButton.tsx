'use client';

interface SubmitButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

export default function SubmitButton({
  disabled,
  isLoading,
  onClick,
}: SubmitButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 pt-4 pb-6 bg-gradient-to-b from-white/0 to-white/90 font-['Pretendard']">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`w-full h-12 rounded-xl text-body font-semibold transition ${
          disabled
            ? 'bg-background-subtlest text-text-subtlest'
            : 'bg-brand-default text-text-inverse'
        }`}
      >
        {isLoading ? '등록 중...' : '등록하기'}
      </button>
    </div>
  );
}
