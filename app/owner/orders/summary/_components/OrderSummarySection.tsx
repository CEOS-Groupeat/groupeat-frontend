import SalesReportFilterChip from './SalesReportFilterChip';

export default function OrderSummarySection() {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-headline3 font-semibold text-text-default">
        시간대별 주문 요약
      </span>
      <div className="flex items-center gap-2">
        <SalesReportFilterChip text="주간" className="active" />
        <SalesReportFilterChip text="월간" className="" />
      </div>
      <div className="w-full h-64 py-4 relative bg-static-white rounded-xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle inline-flex justify-between items-start">
        <div className="w-full inline-flex flex-col justify-start items-start gap-3">
          <div className="size- px-4 inline-flex justify-start items-center gap-1.5">
            <div className="size-1.5 bg-brand-default rounded-full" />
            <div className="justify-center text-text-default text-xs font-medium font-['Pretendard'] leading-4">
              주문량 많은 시간대
            </div>
          </div>
          <div className="self-stretch h-44 relative">
            <div className="w-full px-3 left-0 top-0 absolute inline-flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  100
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  90
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  80
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  70
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  60
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  50
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  40
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  20
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  10
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-3 text-right justify-center text-text-placeholder text-[10px] font-light font-['Pretendard']">
                  0
                </div>
                <div className="w-full h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-border-default"></div>
              </div>
            </div>
            <div className="w-full px-1 left-[32px] top-[32px] absolute inline-flex justify-start items-end gap-1.5 overflow-hidden">
              <div
                data-type="gray"
                className="h-12 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  10시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-20 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  11시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-24 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  12시
                </div>
              </div>
              <div
                data-type="brand"
                className="h-32 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-orange-400 to-orange-600 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-default text-xs font-semibold font-['Pretendard'] leading-4">
                  13시
                </div>
              </div>
              <div
                data-type="brand"
                className="h-40 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-orange-400 to-orange-600 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-default text-xs font-semibold font-['Pretendard'] leading-4">
                  14시
                </div>
              </div>
              <div
                data-type="brand"
                className="h-36 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-orange-400 to-orange-600 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-default text-xs font-semibold font-['Pretendard'] leading-4">
                  15시
                </div>
              </div>
              <div
                data-type="brand"
                className="h-28 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-orange-400 to-orange-600 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-default text-xs font-semibold font-['Pretendard'] leading-4">
                  16시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-24 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  17시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-20 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  18시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-20 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  19시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-20 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              >
                <div className="w-4 flex-1 relative bg-gradient-to-b from-zinc-200 to-neutral-300 rounded-tl-3xl rounded-tr-3xl" />
                <div className="text-center justify-center text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
                  20시
                </div>
              </div>
              <div
                data-type="gray"
                className="h-20 rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-end items-center gap-2 overflow-hidden"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
