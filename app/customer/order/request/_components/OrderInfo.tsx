import TossSymbol from '@/public/icons/icon_toss_symbol.svg';
import KakaoSymbol from '@/public/icons/icon_logo_kakao.svg';

export default function OrderInfo() {
  return (
    <div className="w-full flex flex-col px-4 items-start gap-4">
      <h1 className="text-text-default text-headline3 font-semibold">
        결제 정보
      </h1>
      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-start gap-0.5">
            <p className="text-label1 text-text-default font-medium">
              결제 수단
              <span className="text-brand-default">*</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 text-label1 text-text-default">
              <input type="radio" name="paymentMethod" value="card" />
              <TossSymbol />
              <p className="text-label1">토스페이</p>
            </label>
          </div>
          <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 text-label1 text-text-default">
              <input type="radio" name="paymentMethod" value="transfer" />
              <KakaoSymbol />
              <p className="text-label1">카카오페이</p>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <p className="text-label1 text-text-default font-medium">
              결제 방식
              <span className="text-brand-default">*</span>
            </p>
            <div className="w-full flex items-center gap-2">
              <button className="flex px-2.5 py-3 justify-center items-center gap-2.5 flex-1 rounded-lg border border-border-default">
                <p className="text-text-default text-label1 font-medium">
                  선결제
                </p>
              </button>
              <button className="flex px-2.5 py-3 justify-center items-center gap-2.5 flex-1 rounded-lg border border-border-default">
                <p className="text-text-default text-label1 font-medium">
                  현장결제
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
