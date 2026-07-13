'use client';

import AlertIcon from '@/public/icons/icon_alert.svg';

interface OrderInfoProps {
  paymentMethod: 'PREPAID' | 'ON_SITE';
  setPaymentMethod: (method: 'PREPAID' | 'ON_SITE') => void;
}

export default function OrderInfo({
  paymentMethod,
  setPaymentMethod,
}: OrderInfoProps) {
  return (
    <div className="w-full flex flex-col px-4 items-start gap-1">
      <h1 className="text-text-default text-headline3 font-semibold">
        결제 정보
      </h1>

      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="w-full flex flex-col mt-4 gap-2">
          <p className="text-label1 text-text-default font-medium">
            결제 수단 <span className="text-brand-default">*</span>
          </p>
          <div id="payment-method" className="w-full" />
          <div id="agreement" className="w-full mt-2" />
        </div>

        {/* 결제 방식 영역 */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <p className="text-label1 text-text-default font-medium">
            결제 방식 <span className="text-brand-default">*</span>
          </p>
          <div className="w-full flex items-center gap-2">
            <button
              onClick={() => setPaymentMethod('PREPAID')}
              className={`flex px-2.5 py-3 justify-center items-center flex-1 rounded-lg border transition-colors ${
                paymentMethod === 'PREPAID'
                  ? 'border-transparent bg-brand-background'
                  : 'border-border-default'
              }`}
            >
              <p
                className={`text-label1 font-medium ${paymentMethod === 'PREPAID' ? 'text-brand-default' : 'text-text-default'}`}
              >
                선결제
              </p>
            </button>
            <button
              onClick={() => setPaymentMethod('ON_SITE')}
              className={`flex px-2.5 py-3 justify-center items-center flex-1 rounded-lg border transition-colors ${
                paymentMethod === 'ON_SITE'
                  ? 'border-transparent bg-brand-background'
                  : 'border-border-default'
              }`}
            >
              <p
                className={`text-label1 font-medium ${paymentMethod === 'ON_SITE' ? 'text-brand-default' : 'text-text-default'}`}
              >
                현장결제
              </p>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-1">
          <AlertIcon className="w-4 h-4 text-icon-subtlest" />
          <p className="text-text-subtle text-label2 whitespace-nowrap">
            현장 결제 시 50% 선지불 후, 나머지 50%는 픽업 시 결제돼요
          </p>
        </div>
      </div>
    </div>
  );
}
