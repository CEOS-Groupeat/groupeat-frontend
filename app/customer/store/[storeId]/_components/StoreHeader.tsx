'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { ApiResponse, StoreDetail as StoreDetailType } from '@/types/store';

import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import CartIconButton from '@/components/cart/CartIconButton';

export default function StoreHeader() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId as string;

  const { data: store } = useQuery<StoreDetailType>({
    queryKey: ['storeDetail', storeId],
    queryFn: async () => {
      const response = await fetchClient(`/api/stores/${storeId}`);
      const result = response as unknown as ApiResponse<StoreDetailType>;
      if (!result.isSuccess) throw new Error(result.message);
      return result.data;
    },
    enabled: !!storeId,
  });

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/store');
    }
  };

  return (
    <div
      className="relative w-full shrink-0 h-37 z-0"
      style={{
        background: store?.imageUrl
          ? `linear-gradient(180deg, rgba(0, 0, 0, 0.67) -11.43%, rgba(0, 0, 0, 0.00) 50%), url(${store.imageUrl}) lightgray 50% / cover no-repeat`
          : 'lightgray',
      }}
    >

      <div className="absolute top-0 left-0 z-10 flex w-full pt-10 pb-2.5 px-4 justify-between items-center text-white drop-shadow-md">
        <button
          className="flex w-8 h-8 items-center justify-center rounded-full active:bg-black/20"
          onClick={handleBack}
        >
          <BackIcon className="w-6 h-6" />
        </button>

        <CartIconButton />
      </div>
    </div>
  );
}
