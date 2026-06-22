import StatusDanger from '@/public/icons/icon_status_danger.svg';
import StatusSuccess from '@/public/icons/icon_status_success.svg';
import StatusSuccessRead from '@/public/icons/icon_success_read.svg';
import StatusDangerRead from '@/public/icons/icon_status_danger_read.svg';

interface AlertProps {
  isSucceded: boolean;
  message: string;
  storeName: string;
  menus: string;
  menuQuantity: number;
  pickupDate: string;
  isRead: boolean;
}

export default function AlertComponent({
  isSucceded,
  isRead,
  message,
  storeName,
  menus,
  menuQuantity,
  pickupDate,
}: AlertProps) {
  return (
    <div className="w-full flex pl-4 pt-3 pb-4 pr-5 items-center border-b border-px border-border-subtle">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex w-9 h-9 justify-center items-center">
          {isSucceded ? (
            isRead ? (
              <StatusSuccessRead />
            ) : (
              <StatusSuccess />
            )
          ) : isRead ? (
            <StatusDangerRead />
          ) : (
            <StatusDanger />
          )}
        </div>

        <div className="flex flex-col items-start gap-0.75 flex-1">
          <div className="flex justify-between items-center self-stretch">
            <p className="text-text-default text-body font-semibold">
              {isSucceded ? '승인 완료' : '승인 거절'}
            </p>
            <p className="text-text-subtlest text-caption2">3일 전</p>
          </div>

          <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-start gap-1">
              <p className="text-text-subtle text-label2">{storeName}</p>
              <p className="text-text-subtle text-label2"> | </p>
              <p className="text-text-subtle text-label2">{menus}</p>
              <p className="text-text-subtle text-label2">{menuQuantity}개</p>
            </div>
            <p className="text-text-subtle text-label2">{pickupDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
