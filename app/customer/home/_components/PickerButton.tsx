import IconDownArrow from '@/public/icons/icon_arrow_down.svg';

interface PickerButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick?: () => void;
}

export default function PickerButton({
  icon,
  label,
  value,
  onClick,
}: PickerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[109px] h-[60px] px-2.5 py-2 bg-static-white rounded-lg outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col gap-2"
    >
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-text-subtlest text-caption2 font-normal">
          {label}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-text-strong text-label1 font-medium">
          {value}
        </span>
        <IconDownArrow className="size-4 text-icon-disable" />
      </div>
    </button>
  );
}
