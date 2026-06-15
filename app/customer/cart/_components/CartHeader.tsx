'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';

interface CartHeaderProps {
  totalStoreCount: number;
  onDeleteAll: () => void;
}

export default function CartHeader({
  totalStoreCount,
  onDeleteAll,
}: CartHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full mt-10 p-4 relative">
        <button type="button" onClick={() => router.back()}>
          <BackIcon className="size-5 text-icon-default" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-text-default text-headline3 font-semibold font-['Pretendard']">
          장바구니
        </span>
      </div>

      <div className="flex justify-between w-full px-4 py-1.5 mb-3 font-['Pretendard']">
        <span className="text-label2 font-medium text-text-default">
          가게({totalStoreCount})
        </span>
        <button
          type="button"
          onClick={onDeleteAll}
          className="text-xs text-text-subtle font-normal leading-4 underline"
        >
          전체 삭제
        </button>
      </div>
    </>
  );
}
