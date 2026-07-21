'use client';

interface OrderPriceProps {
  perPersonAmount: number;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountRate: number;
}

export default function OrderPrice({
  perPersonAmount,
  originalPrice,
  discountAmount,
  finalPrice,
  discountRate,
}: OrderPriceProps) {
  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex justify-between items-center self-stretch">
            <p className="text-text-default text-label2">1인당 금액</p>
            <p className="text-text-default text-label1 font-semibold">
              {perPersonAmount.toLocaleString()}원
            </p>
          </div>

          {/* 할인 금액 및 원가 취소선 */}
          <div className="flex flex-col items-end self-stretch gap-2">
            <div className="flex justify-between items-center self-stretch">
              <div className="flex items-center gap-1">
                <p className="text-text-default text-label2">그루핏 제휴</p>
                {discountRate > 0 && (
                  <div className="flex px-1.5 py-0.5 items-center justify-center rounded-sm bg-brand-background">
                    <p className="text-brand-default text-caption2 font-semibold">
                      {discountRate}% 할인
                    </p>
                  </div>
                )}
              </div>
              <p className="text-status-danger text-label1 font-semibold">
                -{discountAmount.toLocaleString()}원
              </p>
            </div>
            {discountRate > 0 && (
              <p className="text-text-subtlest text-caption1 font-medium line-through">
                {originalPrice.toLocaleString()}원
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="flex py-1 justify-between items-center self-stretch">
          <p className="text-text-default text-label1 font-semibold">
            총 결제 금액
          </p>
          <div className="flex flex-col items-end">
            <p className="text-text-default text-headline3 font-semibold">
              {finalPrice.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}