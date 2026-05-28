import StoreDetail from '@/app/customer/store/[storeId]/_components/StoreDetail';
import StoreHeader from '@/app/customer/store/[storeId]/_components/StoreHeader';
import StoreOptions from '@/app/customer/store/[storeId]/_components/StoreOptions';

{
  /* 가게 상세 페이지입니다. */
}

export default function CustomerStoreDetailPage() {
  return (
    <div className="flex flex-col w-full bg-background-default">
      {/* 상단 헤더 (이미지 + 뒤로가기/장바구니 아이콘) */}
      <StoreHeader />
      
      {/* StoreDetail이 이미지를 덮도록 위로 당기고(-mt-6) 둥근 모서리 적용 */}
      <div className="relative z-20 -mt-6 w-full bg-white rounded-t-[30px] overflow-hidden">
        <StoreDetail />
      </div>
      
      <div className="w-full h-2 bg-border-divider" />
      
      <StoreOptions />
    </div>
  );
}