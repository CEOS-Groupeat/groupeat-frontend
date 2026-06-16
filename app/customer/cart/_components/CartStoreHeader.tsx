'use client';

import { useRouter } from 'next/navigation';
import RadioOn from '@/public/icons/icon_raidoOn.svg';
import RadioOff from '@/public/icons/icon_raidoOff.svg';
import ToStoreIcon from '@/public/icons/icon_arrow_right.svg';

interface CartStoreHeaderProps {
  storeId: number;
  storeName: string;
  hasSelected: boolean;
  onSelectAll: () => void;
}

export default function CartStoreHeader({
  storeId,
  storeName,
  hasSelected,
  onSelectAll,
}: CartStoreHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex gap-1 pt-5 border-t border-border-default">
      <button type="button" onClick={onSelectAll} aria-label={hasSelected ? '매장 선택 해제' : '매장 선택'}  aria-pressed={hasSelected} className="flex shrink-0">
        {hasSelected ? (
          <RadioOn className="size-6 text-icon-default" />
        ) : (
          <RadioOff className="size-6 text-icon-disable" />
        )}
      </button>
      <span className="text-body font-bold text-text-default font-['Pretendard']">
        {storeName}
      </span>
      <button
        type="button"
        onClick={() => router.push(`/customer/store/${storeId}`)}
        aria-label={`${storeName} 매장으로 이동`}
        className="flex items-center shrink-0"
      >
        <ToStoreIcon className="size-4 text-icon-subtle" />
      </button>
    </div>
  );
}
