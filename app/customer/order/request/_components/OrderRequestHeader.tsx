'use client';

import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';
import { useRouter } from 'next/navigation';

export default function OrderRequestHeader() {
  const router = useRouter();

  return (
    <header className="w-full flex justify-between items-center p-4">
      <ArrowLeft onClick={() => router.back()} className="w-5 h-5"/>
      <h1 className="text-text-default text-headline3 font-semibold">주문 요청</h1>
      <div />
    </header>
  );
}
