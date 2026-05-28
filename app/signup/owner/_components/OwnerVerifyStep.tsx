import DefaultButton from '@/components/ui/ButtonDefault';

export default function OwnerVerifyStep() {
  const handleClick = () => {};
  return (
    <div className="flex flex-col items-start gap-3 self-stretch mt-3 pb-24">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        <div className="flex w-full flex-col items-start gap-4">
          <h2 className="text-body font-semibold">휴대폰 본인 인증</h2>

          <div className="flex flex-col items-start gap-4.5 self-stretch w-full">
            {/* 휴대폰 번호 입력 및 전송 영역 */}
            <div className="flex items-start gap-2 w-full">
              <input
                type="number"
                className="flex-1 h-11 pl-4 pr-3 py-3 rounded-lg border border-px border-border-default placeholder:text-body placeholder:text-text-placeholder focus:outline-none focus:border-border-active disabled:bg-neutral-5 disabled:text-text-disabled"
                placeholder="사업자 번호 입력"
              />
              <button className="w-31 h-11 px-6 py-3 flex items-center justify-center rounded-lg bg-background-subtlest disabled:opacity-50 transition-opacity">
                <p className="text-label1 text-text-subtlest whitespace-nowrap">
                  사업자 조회
                </p>
              </button>
            </div>

            <div className="flex flex-col h-29.5 items-start gap-2 self-stretch">
              <p className="text-label1 text-text-default">사업자등록증 첨부</p>
              <button className="w-full h-22.5 px-6 py-3 flex flex-col justify-center items-start flex-1 self-stretch border border-px border-border-default rounded-lg bg-background-default">
                <div className="flex flex-col justify-center items-start gap-1">
                  <p className="text-text-subtle text-label1">파일 선택</p>
                  <p className="text-text-subtlest ">PNG, JPG, 5MB 이하</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton onClick={handleClick}>다음</DefaultButton>
      </div>
    </div>
  );
}
