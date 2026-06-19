import StatusDanger from '@/public/icons/icon_status_danger.svg';
import StatusSuccess from '@/public/icons/icon_status_success.svg'
interface AlertProps {
  isSucceded: boolean;
  message: string;
}

export default function AlertComponent({ isSucceded, message }: AlertProps) {
  return (
    <div className="flex w-full h-full flex-col p-5 gap-6.5">
      <div className="w-full flex justify-between h-22.5 px-4 pt-3 pb-4 gap-3 border-b border-px">
        {isSucceded ? (
          <div className="flex flex-1 h-full items-center">
            <StatusSuccess/>
          </div>
        ) : (
          <div className="flex flex-1 h-full items-center">
            <StatusDanger/>
          </div>
        )}
        <div className='flex flex-col '>{message}</div>
      </div>
    </div>
  );
}
