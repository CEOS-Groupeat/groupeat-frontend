import StatusSuccess from '@/public/icons/icon_check.svg';

interface PickupCompleteToastProps {
  text: string;
}

export default function PickupCompleteToast({
  text,
}: PickupCompleteToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex w-fit px-4 py-1.5 justify-center items-center gap-1 rounded-full bg-background-toast/85 backdrop-blur-[32px]
      fixed bottom-[90px] left-1/2 -translate-x-1/2 z-toast animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <StatusSuccess className="size-6 shrink-0" />
      <p className="text-label1 font-semibold text-text-inverse whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}
