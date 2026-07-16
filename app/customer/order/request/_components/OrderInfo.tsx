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
    <div className="w-full flex flex-col items-start gap-1">
      <div className="w-full flex flex-col px-4 gap-4">
        <p className="text-label1 text-text-default font-medium">
          결제 수단 <span className="text-brand-default">*</span>
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="w-full flex flex-col">
          <div id="payment-method" className="w-full" />
          <div id="agreement" className="w-full" />
        </div>

        {/* 결제 방식 영역 */}
        <div className="flex flex-col items-start gap-2 self-stretch px-4">
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

        <div className="flex items-start gap-1 px-4">
          <AlertIcon className="w-4 h-4 text-icon-subtlest" />
          <p className="text-text-subtle text-label2 whitespace-nowrap">
            현장 결제 시 결제 금액의 50%를 선지불해 주세요
          </p>
        </div>
      </div>
    </div>
  );
}
