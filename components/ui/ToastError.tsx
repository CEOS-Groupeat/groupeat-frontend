import StatusError from '@/public/icons/icon_status_error.svg';

interface ToastErrorProps {
  text: string;
}

export default function ToastError({ text }: ToastErrorProps) {
  return (
    <div 
      className="flex w-fit px-4 py-1.5 justify-center items-center gap-1 rounded-full bg-background-toast/52 backdrop-blur-[32px] 
      fixed bottom-20 left-1/2 -translate-x-1/2 z-toast animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <StatusError className="shrink-0" />
      <p className="text-label1 text-text-inverse whitespace-nowrap">{text}</p>
    </div>
  );
}