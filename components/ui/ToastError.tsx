import StatusError from '@/public/icons/icon_status_error.svg';

interface ToastErrorProps {
  text: string;
}

export default function ToastError({ text }: ToastErrorProps) {
  return (
    <div className="flex w-52 px-4 py-2.5 justify-center items-center gap-1.5 rounded-full bg-background-toast/52">
      <StatusError className="shrink-0" />
      <p className="text-label1 text-text-inverse">{text}</p>
    </div>
  );
}
