'use client';

import StatusDanger from '@/public/icons/icon_status_danger.svg';
import StatusSuccess from '@/public/icons/icon_status_success.svg';
import StatusSuccessRead from '@/public/icons/icon_success_read.svg';
import StatusDangerRead from '@/public/icons/icon_status_danger_read.svg';

type OwnerNotificationType =
  | 'NEW_ORDER_REQUEST'
  | 'ORDER_ACCEPT_DEADLINE_12H'
  | 'ORDER_ACCEPT_DEADLINE_1H';

interface OwnerAlertProps {
  notificationType: OwnerNotificationType;
  message: string;
  storeName: string;
  menuSummary: string;
  pickupDate: string;
  pickupTime: string;
  receivedAt: string;
  isRead: boolean;
}

const TITLE_MAP: Record<OwnerNotificationType, string> = {
  NEW_ORDER_REQUEST: '새로운 주문이 접수되었습니다.',
  ORDER_ACCEPT_DEADLINE_12H: '수락 마감 12시간 전입니다.',
  ORDER_ACCEPT_DEADLINE_1H: '수락 마감 1시간 전입니다.',
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

export default function OwnerAlertComponent({
  notificationType,
  isRead,
  storeName,
  menuSummary,
  pickupDate,
  pickupTime,
  receivedAt,
}: OwnerAlertProps) {
  const renderIcon = () => {
    if (notificationType === 'NEW_ORDER_REQUEST') {
      return isRead ? <StatusSuccessRead /> : <StatusSuccess />;
    }
    // ORDER_ACCEPT_DEADLINE_12H, ORDER_ACCEPT_DEADLINE_1H
    return isRead ? <StatusDangerRead /> : <StatusDanger />;
  };

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
            <p className="text-text-subtlest text-caption2">
              {getRelativeTime(receivedAt)}
            </p>
          </div>

          <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-start gap-1">
              <p className="text-text-subtle text-label2">{storeName}</p>
              <p className="text-text-subtle text-label2"> | </p>
              <p className="text-text-subtle text-label2">{menuSummary}</p>
            </div>
            <p className="text-text-subtle text-label2">
              {formatDate(pickupDate)} {pickupTime?.slice(0, 5)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
