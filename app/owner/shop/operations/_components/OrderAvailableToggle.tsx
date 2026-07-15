// "주문 받기" 토글
'use client';

import ToggleOnIcon from '@/public/icons/icon_SwitchOn.svg';
import ToggleOffIcon from '@/public/icons/icon_SwitchOff.svg';

interface OrderAvailableToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function OrderAvailableToggle({
  checked,
  onChange,
}: OrderAvailableToggleProps) {
  return (
    <div className="self-stretch flex justify-between items-center font-['Pretendard']">
      <span className="text-text-default text-body font-medium">주문 받기</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        {checked ? (
          <ToggleOnIcon className="w-10" />
        ) : (
          <ToggleOffIcon className="w-10" />
        )}
      </button>
    </div>
  );
}
