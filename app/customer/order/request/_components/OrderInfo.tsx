'use client';

interface OrderInfoProps {
  paymentMethod: 'PREPAID' | 'ONSITE';
  setPaymentMethod: (method: 'PREPAID' | 'ONSITE') => void;
}

export default function OrderInfo({
  paymentMethod,
  setPaymentMethod,
}: OrderInfoProps) {
  return (
    <div className="w-full flex flex-col px-4 items-start gap-4">
      <h1 className="text-text-default text-headline3 font-semibold">
        결제 정보
      </h1>

      <div className="flex flex-col items-start gap-3 self-stretch">
        {/* 결제 방식 영역 (우리가 만든 UI 유지) */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <p className="text-label1 text-text-default font-medium">
            결제 방식 <span className="text-brand-default">*</span>
          </p>
          <div className="w-full flex items-center gap-2">
            <button
              onClick={() => setPaymentMethod('PREPAID')}
              className={`flex px-2.5 py-3 justify-center items-center flex-1 rounded-lg border transition-colors ${
                paymentMethod === 'PREPAID'
                  ? 'border-brand-default bg-brand-background'
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
              onClick={() => setPaymentMethod('ONSITE')}
              className={`flex px-2.5 py-3 justify-center items-center flex-1 rounded-lg border transition-colors ${
                paymentMethod === 'ONSITE'
                  ? 'border-brand-default bg-brand-background'
                  : 'border-border-default'
              }`}
            >
              <p
                className={`text-label1 font-medium ${paymentMethod === 'ONSITE' ? 'text-brand-default' : 'text-text-default'}`}
              >
                현장결제
              </p>
            </button>
          </div>
        </div>

        <div
          className={`w-full flex-col mt-4 gap-2 ${paymentMethod === 'PREPAID' ? 'flex' : 'hidden'}`}
        >
          <p className="text-label1 text-text-default font-medium">
            결제 수단 <span className="text-brand-default">*</span>
          </p>
          {/* 토스 위젯 렌더링 타겟 */}
          <div id="payment-method" className="w-full" />
          <div id="agreement" className="w-full mt-2" />
        </div>
      </div>
    </div>
  );
}
