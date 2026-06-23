import Ellipse from '@/public/icons/icon_ellipse.svg';
import Image from 'next/image';

const mockOrderCard = {
  storeId: 1,
  storeName: '데이브런치',
  storeCategory: '샌드위치&김밥',
  cartItems: [
    {
      cartItemId: 100,
      menuSummary: '1번 세트',
      imageUrl: '',
      quantity: 56,
      unitPrice: 7000,
      discountAmount: 19600,
      discountRate: 5,
      finalPrice: 372400,
    },
    {
      cartItemId: 200,
      menuSummary: '반반 세트 2 (햄치즈 샌드위치, 참치 김밥)',
      imageUrl: '',
      quantity: 30,
      unitPrice: 7200,
      discountAmount: 13000,
      discountRate: 5,
      finalPrice: 500000,
    },
  ],
  storeTotalPrice: 872400,
};

export default function OrderCard() {
  return (
    <div className="w-full flex flex-col p-4 items-start gap-3 border border-px rounded-xl border-border-default bg-background-default">
      <div className="flex pb-3 flex-col items-start gap-0.5 self-stretch">
        <p className="text-text-default text-body font-semibold">
          {mockOrderCard.storeName}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-text-subtlest text-label1">5월 12일</p>
          <Ellipse />
          <p className="text-text-subtlest text-label1">오후 5시</p>
        </div>
      </div>

      <div className="flex flex-col px-4 items-start gap-6 self-stretch">
        {mockOrderCard.cartItems.map((item) => {
          return (
            <div
              key={item.cartItemId}
              className="w-full flex items-start gap-3"
            >
              <div className="w-14 h-14 shrink-0 aspect-square rounded-[7px] bg-brand-background">
                <Image
                  src={
                    item.imageUrl?.startsWith('/') ||
                    item.imageUrl?.startsWith('https://')
                      ? item.imageUrl
                      : '/images/image_logo.png'
                  }
                  alt={item.menuSummary ?? ''}
                  className="object-cover"
                  width={56}
                  height={56}
                />
              </div>
              <div className="min-w-0 flex flex-col items-start gap-2 flex-1">
                <div className="flex flex-col items-start gap-0.5 self-stretch">
                  <p className="text-text-default text-label1 font-semibold truncate">
                    {item.menuSummary}
                  </p>
                  <p className="h-9 self-stretch text-text-subtle text-caption1 line-clamp-2">
                    루꼴라 샌드위치 아메리카노
                  </p>
                  <div className="flex flex-col items-start self-stretch">
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-text-default text-caption1">수량</p>
                      <p className="text-text-default text-label1 font-semibold">
                        {item.quantity}개
                      </p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-text-default text-caption1">가격</p>
                      <p className="text-text-default text-label1 font-semibold">
                        {item.finalPrice}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
