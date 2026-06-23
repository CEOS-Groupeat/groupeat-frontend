export default function OrderAmount() {
  return (
    <div className="w-full flex flex-col px-4 items-start gap-4">
      <h1 className="text-text-default text-headline3 font-semibold">
        결제 금액
      </h1>
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex justify-between items-center self-stretch">
                <p className="text-text-default text-label2">1인당 금액</p>
                <p className="text-text-default text-label2">7,000원</p>
            </div>
            <div className="flex justify-between items-center self-stretch">
                <div className="flex items-center gap-1">
                    <p className="text-text-default text-label2">그루핏 제휴</p>
                    <div className="flex px-2 py-1 flex-col items-start rounded-sm bg-brand-background">
                        <p className="text-brand-default text-caption2 font-semibold">5% 할인</p>
                    </div>
                </div>
                <p className="text-brand-strong text-label1 font-semibold">-37,420원</p>
            </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="flex py-1 justify-between items-end self-stretch">
            <p className="text-text-default text-label1 font-semibold">총 결제 금액</p>
            <div className="flex flex-col items-end">
                <p className="text-text-subtlest text-caption1">392,000원</p>
                <p className="text-text-default text-headline3 font-semibold">
                    782,040원
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
