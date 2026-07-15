'use client';

import InputField from '@/components/ui/InputField';

interface OrderQuantityFieldsProps {
  minQuantity: string;
  maxQuantity: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

export default function OrderQuantityFields({
  minQuantity,
  maxQuantity,
  onMinChange,
  onMaxChange,
}: OrderQuantityFieldsProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-3 font-['Pretendard']">
      <span className="text-text-default text-body font-medium">주문 수량</span>
      <div className="self-stretch flex justify-center items-end gap-3">
        <InputField
          label="최소"
          value={minQuantity}
          onChange={(e) => onMinChange(e.target.value)}
          labelClassName="text-label2 font-normal text-text-subtle"
          className="flex-1 !gap-1.5"
          placeholder="수량"
          inputClassName="!text-body !font-medium !text-text-default placeholder:!font-normal placeholder:!text-base placeholder:!leading-6"
        />
        <InputField
          label="최대"
          value={maxQuantity}
          onChange={(e) => onMaxChange(e.target.value)}
          labelClassName="text-label2 font-normal text-text-subtle"
          className="flex-1 !gap-1.5"
          placeholder="수량"
          inputClassName="!text-body !font-medium !text-text-default placeholder:!font-normal placeholder:!text-base placeholder:!leading-6"
        />
      </div>
    </div>
  );
}
