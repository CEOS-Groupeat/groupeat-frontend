'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <div className="flex w-full mt-10 mb-5 p-4 relative">
      <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
        <BackIcon className="size-5 text-icon-default" />
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 text-text-default text-headline3 font-semibold font-['Pretendard']">
        프로필
      </span>
    </div>
  );
}
