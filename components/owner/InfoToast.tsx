import Notice from '@/public/icons/icon_notice.svg';

interface InfoToastProps {
  onClose: () => void;
}

export default function InfoToast({ onClose }: InfoToastProps) {
  return (
    <div className="flex justify-between px-4 py-3 mx-4 mb-1 rounded-full bg-background-transparent outline outline-1 outline-offset-[-1px] outline-border-subtle shadow-[0px_2px_16px_0px_rgba(0,0,0,0.05)] backdrop-blur-sm font-['Pretendard']">
      <div className="flex justify-center items-center gap-1.5">
        <Notice className="size-4" />
        <span className="text-label2 text-text-default font-medium">
          주문 유의사항
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-caption1 text-text-subtlest font-normal"
        aria-label="주문 유의사항 닫기"
      >
        닫기
      </button>
    </div>
  );
}
