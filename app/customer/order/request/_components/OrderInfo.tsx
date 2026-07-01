'use client';

import TossSymbol from '@/public/icons/icon_toss_symbol.svg';
import KakaoSymbol from '@/public/icons/icon_logo_kakao.svg';

interface OrderInfoProps {
  paymentProvider: 'toss' | 'kakao' | null;
  setPaymentProvider: (provider: 'toss' | 'kakao') => void;
  paymentMethod: 'PREPAID' | 'ONSITE';
  setPaymentMethod: (method: 'PREPAID' | 'ONSITE') => void;
}

export default function OrderInfo({
  paymentProvider,
  setPaymentProvider,
  paymentMethod,
  setPaymentMethod,
}: OrderInfoProps) {
  return (
    <div className="w-full flex flex-col px-4 items-start gap-4">
      <h1 className="text-text-default text-headline3 font-semibold">
        결제 정보
      </h1>

      <div className="flex flex-col items-start gap-3 self-stretch">
        {/* 결제 수단 영역 */}
        <div className="flex flex-col items-start gap-2">
          <p className="text-label1 text-text-default font-medium">
            결제 수단 <span className="text-brand-default">*</span>
          </p>
          <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 text-label1 text-text-default cursor-pointer">
              <input
                type="radio"
                name="paymentProvider"
                checked={paymentProvider === 'toss'}
                onChange={() => setPaymentProvider('toss')}
                disabled={paymentMethod === 'ONSITE'} // 현장결제면 비활성화
              />
              <TossSymbol />
              <p className="text-label1">토스페이</p>
            </label>
          </div>
          <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 text-label1 text-text-default cursor-pointer">
              <input
                type="radio"
                name="paymentProvider"
                checked={paymentProvider === 'kakao'}
                onChange={() => setPaymentProvider('kakao')}
                disabled={paymentMethod === 'ONSITE'}
              />
              <KakaoSymbol />
              <p className="text-label1">카카오페이</p>
            </label>
          </div>
        </div>

        {/* 결제 방식 영역 */}
        <div className="flex flex-col items-start gap-2 self-stretch mt-2">
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
      </div>
    </div>
  );
}
