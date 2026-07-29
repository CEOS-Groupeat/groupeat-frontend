import type { GetResponse } from '@/src/types/api';
import AlertComponent from './AlertComponent';
import AlertEmptyState from './AlertEmptyState';

type NotificationListResponse = GetResponse<'/api/notifications'>;
type NotificationItem = NonNullable<
  NonNullable<NotificationListResponse['data']>['notificationList']
>[number];

interface AlertListSectionProps {
  notifications: NotificationItem[];
  onReadAll: () => void;
  isMarkingAll: boolean;
  onNotificationClick: (notificationId?: number, referenceId?: number) => void;
}

export default function AlertListSection({
  notifications,
  onReadAll,
  isMarkingAll,
  onNotificationClick,
}: AlertListSectionProps) {
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <>
      <div className="flex px-4 justify-between items-center self-stretch mb-1">
        <h1 className="text-text-default text-headline2 font-semibold">
          알림 목록
        </h1>
        <button
          onClick={onReadAll}
          disabled={isMarkingAll || !hasUnread}
          className={`flex h-8 px-3 flex-col justify-center items-center rounded-lg ${
            !hasUnread
              ? 'bg-background-subtlest'
              : 'outline outline-1 outline-offset-[-1px] outline-border-default bg-background-default'
          }`}
        >
          <p
            className={`text-caption1 font-semibold  ${
              !hasUnread ? 'text-text-subtlest' : 'text-text-default'
            }`}
          >
            모두 읽음
          </p>
        </button>
      </div>

      {notifications.length === 0 ? (
        <AlertEmptyState />
      ) : (
      notifications.map((n) => {
        // 고객 화면에서는 고객용 타입만 실제로 내려오지만,
        // 자동생성 타입 자체는 공용(6개)이라 여기서 안전하게 좁혀줌
        const customerType =
          n.notificationType === 'ORDER_ACCEPTED' ||
          n.notificationType === 'ORDER_REJECTED' ||
          n.notificationType === 'PICKUP_REMINDER_DAY_BEFORE'
            ? n.notificationType
            : 'PICKUP_REMINDER_DAY_BEFORE';

        return (
          <div
            key={n.notificationId}
            className="w-full cursor-pointer"
            onClick={() => onNotificationClick(n.notificationId, n.referenceId)}
          >
            <AlertComponent
              notificationType={customerType}
              message={n.title ?? ''}
              storeName={n.storeName ?? ''}
              isRead={n.read ?? false}
              menuSummary={n.menuSummary ?? ''}
              pickupDate={n.pickupDate ?? ''}
              pickupTime={n.pickupTime ?? ''}
              receivedAt={n.receivedAt ?? ''}
            />
          </div>
        );
      })
      )}
    </>
  );
}
