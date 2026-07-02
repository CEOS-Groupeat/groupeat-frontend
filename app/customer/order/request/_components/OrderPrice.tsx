// app/customer/order/request/_components/OrderPrice.tsx
'use client';

interface OrderPriceProps {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountRate: number;
}

export default function OrderPrice({
  originalPrice,
  discountAmount,
  finalPrice,
  discountRate,
}: OrderPriceProps) {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-col items-start gap-2 self-stretch">
          {/* 상품 원래 총액 */}
          <div className="flex justify-between items-center self-stretch">
            <p className="text-text-default text-label2">총 상품 금액</p>
            <p className="text-text-default text-label2">
              {originalPrice.toLocaleString()}원
            </p>
          </div>

          {/* 할인 금액 */}
          <div className="flex justify-between items-center self-stretch">
            <div className="flex items-center gap-1">
              <p className="text-text-default text-label2">그루핏 제휴</p>
              {discountRate > 0 && (
                <div className="flex px-2 py-1 flex-col items-start rounded-sm bg-brand-background">
                  <p className="text-brand-default text-caption2 font-semibold">
                    {discountRate}% 할인
                  </p>
                </div>
              )}
            </div>
            <p className="text-brand-strong text-label1 font-semibold">
              -{discountAmount.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>

      {/* 최종 결제 금액 */}
      <div className="flex flex-col items-start gap-1 self-stretch border-t border-border-default pt-4">
        <div className="flex py-1 justify-between items-end self-stretch">
          <p className="text-text-default text-label1 font-semibold">
            최종 결제 금액
          </p>
          <div className="flex flex-col items-end">
            {/* 할인이 들어간 경우 취소선 표시 등 활용 가능 */}
            <p className="text-text-default text-headline3 font-semibold">
              {finalPrice.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
