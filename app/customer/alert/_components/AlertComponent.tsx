'use client';

import StatusDanger from '@/public/icons/icon_status_danger.svg';
import StatusSuccess from '@/public/icons/icon_status_success.svg';
import StatusSuccessRead from '@/public/icons/icon_success_read.svg';
import StatusDangerRead from '@/public/icons/icon_status_danger_read.svg';
import StatusInfo from '@/public/icons/icon_status_info.svg';
import StatusInfoRead from '@/public/icons/icon_status_info_read.svg';

type CustomerNotificationType =
  | 'ORDER_ACCEPTED'
  | 'ORDER_REJECTED'
  | 'PICKUP_REMINDER_DAY_BEFORE';

interface AlertProps {
  notificationType: CustomerNotificationType;
  message: string;
  storeName: string;
  menuSummary: string;
  pickupDate: string;
  pickupTime: string;
  receivedAt: string;
  isRead: boolean;
}

const TITLE_MAP: Record<CustomerNotificationType, string> = {
  ORDER_ACCEPTED: '승인 완료',
  ORDER_REJECTED: '승인 거절',
  PICKUP_REMINDER_DAY_BEFORE: '픽업 하루 전 알림',
};

function getRelativeTime(receivedAt: string): string {
  const received = new Date(receivedAt);
  const now = new Date();
  const diffMs = now.getTime() - received.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
}

export default function AlertComponent({
  notificationType,
  isRead,
  storeName,
  menuSummary,
  pickupDate,
  pickupTime,
  receivedAt,
}: AlertProps) {
  const renderIcon = () => {
    if (notificationType === 'ORDER_ACCEPTED') {
      return isRead ? <StatusSuccessRead /> : <StatusSuccess />;
    }
    if (notificationType === 'ORDER_REJECTED') {
      return isRead ? <StatusDangerRead /> : <StatusDanger />;
    }
    return isRead ? <StatusInfoRead /> : <StatusInfo />;
  };

  function formatDate(pickupDate: string): string {
    if (!pickupDate) return '';

    const date = new Date(pickupDate);
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

    return `${yy}.${mm}.${dd} (${weekday})`;
  }

  return (
    <div className="w-full flex pl-4 pt-3 pb-4 pr-5 items-center border-b border-px border-border-subtle">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex w-9 h-9 justify-center items-center shrink-0">
          {renderIcon()}
        </div>

        <div className="flex flex-col items-start gap-0.75 flex-1">
          <div className="flex justify-between items-center self-stretch">
            <p className="text-text-default text-body font-semibold">
              {TITLE_MAP[notificationType]}
            </p>
            <p className="text-text-subtlest text-caption2 font-normal">
              {getRelativeTime(receivedAt)}
            </p>
          </div>

          <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-start gap-1">
              <p className="text-text-subtle text-label2 font-normal">
                {storeName}
              </p>
              <p className="text-text-subtle text-label2 font-normal"> | </p>
              <p className="text-text-subtle text-label2 font-normal">
                {menuSummary}
              </p>
            </div>
            <p className="text-text-subtle text-label2 font-normal">
              {formatDate(pickupDate)} {pickupTime?.slice(0, 5)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
