'use client';

import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <ArrowLeft 
      className="w-5 h-5 cursor-pointer" 
      onClick={() => router.back()} 
    />
  );
}