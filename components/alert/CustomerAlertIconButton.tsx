'use client';

import { useRouter } from 'next/navigation';
import BellIcon from '@/public/icons/icon-bell.svg';
import { useUnreadCount } from '@/hooks/notifications/useUnreadCount';

interface CustomerAlertIconButtonProps {
  iconColor?: string;
  badgeColor?: string;
  badgeTextColor?: string;
}

export default function CustomerAlertIconButton({
  iconColor = 'text-icon-inverse',
  badgeColor = 'bg-brand-default',
  badgeTextColor = 'text-text-inverse',
}: CustomerAlertIconButtonProps) {
  const router = useRouter();
  const { data } = useUnreadCount();
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <button
      type="button"
      onClick={() => router.push('/customer/alert')}
      aria-label={
        unreadCount > 0
          ? `알림, 안 읽은 알림 ${unreadCount}개`
          : '알림으로 이동'
      }
      className="relative size-6"
    >
      <BellIcon className={`size-6 ${iconColor}`} />
      {unreadCount > 0 && (
        <div
          aria-hidden="true"
          className={`absolute left-[13px] top-[-6px] min-w-[16px] h-4 px-0.5 ${badgeColor} rounded-full flex items-center justify-center`}
        >
          <span className={`text-caption2 font-semibold ${badgeTextColor}`}>
            {unreadCount}
          </span>
        </div>
      )}
    </button>
  );
}