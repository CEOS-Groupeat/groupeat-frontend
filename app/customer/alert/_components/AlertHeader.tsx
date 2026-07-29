'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';

export default function AlertHeader() {
  const router = useRouter();

  return (
    <div className="w-full flex px-3 pt-[56px] pb-2 flex-col justify-end items-center self-stretch bg-background-default">
      <div className="w-full flex h-11 items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-6 items-center flex-1"
        >
          <BackIcon className="size-6 text-icon-subtle" />
        </button>
      </div>
    </div>
  );
}
