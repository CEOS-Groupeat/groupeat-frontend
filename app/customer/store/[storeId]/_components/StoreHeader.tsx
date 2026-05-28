'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import CartIcon from '@/public/icons/icon_shoppingCart.svg';
import Image from 'next/image';

export default function StoreHeader() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/store');
    }
  };

  return (
    // 💡 1. 부모 컨테이너: 전체 영역을 잡고 기준점(relative)이 됩니다.
    // 기존 h-64.5 등을 제거하고 shrink-0으로 크기 고정
    <div className="relative w-full shrink-0 h-37">
      
      {/* 💡 2. 이미지 영역: 128px 고정 h를 가집니다. */}
      {/* <Image /> 실제 적용 시 아래 주석 해제 */}
      {/* <Image
        src="..." // 여기에 이미지 주소 넣기
        alt="스토어 헤더 이미지"
        fill // 부모를 가득 채웁니다 (w-full h-full)
        className="object-cover" // 💡 비율 유지하며 꽉 채우고 남는 부분 자동 크롭 (핵심)
      /> 
      */}
      {/* 이미지 대체용 임시 블랙 박스 */}
      <div className="w-full h-full bg-black"></div>

      {/* 💡 3. 아이콘 영역: absolute top-0으로 이미지 위에 공중 부양 시킵니다. */}
      {/* z-10으로 이미지보다 위에 위치하게 함. pt-10은 아이폰 노치 등 상태바 영역을 고려한 여백 */}
      <div className="absolute top-0 left-0 z-10 flex w-full pt-10 pb-2.5 px-4 justify-between items-center text-white drop-shadow-md">
        <button
          className="flex w-8 h-8 items-center justify-center rounded-full active:bg-black/20"
          onClick={handleBack}
        >
          <BackIcon className="w-6 h-6" />
        </button>
        {/* TODO: 장바구니 페이지로 이동하는 router logic 추가 필요 */}
        <button className="flex w-8 h-8 items-center justify-center rounded-full active:bg-black/20">
          <CartIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}