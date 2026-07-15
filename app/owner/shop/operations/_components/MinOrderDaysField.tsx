'use client';

interface MinOrderDaysFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MinOrderDaysField({
  value,
  onChange,
}: MinOrderDaysFieldProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-3 font-['Pretendard'] mb-12">
      <span className="text-center text-text-default text-body font-medium">
        최소 주문 가능 기한
      </span>
      <div className="self-stretch flex justify-start items-center gap-2">
        <span className="text-text-default text-label1 font-normal">
          픽업일
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={'0'}
          className="size-11 p-3 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong text-center text-text-default text-body font-medium placeholder:text-text-placeholder placeholder:font-normal placeholder:text-body placeholder:leading-6"
        />
        <span className="text-text-default text-label1 font-normal">
          일 전까지 주문 가능
        </span>
      </div>
    </div>
  );
}
