import type { GetResponse } from '@/src/types/api';
import OwnerAlertComponent from './OwnerAlertComponent';
import OwnerAlertEmptyState from './OwnerAlertEmptyState';

type NotificationListResponse = GetResponse<'/api/notifications'>;
type NotificationItem = NonNullable<
  NonNullable<NotificationListResponse['data']>['notificationList']
>[number];

interface OwnerAlertListSectionProps {
  notifications: NotificationItem[];
  onReadAll: () => void;
  isMarkingAll: boolean;
  onNotificationClick: (notificationId?: number, referenceId?: number) => void;
}

export default function OwnerAlertListSection({
  notifications,
  onReadAll,
  isMarkingAll,
  onNotificationClick,
}: OwnerAlertListSectionProps) {
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
            className={`text-caption1 font-semibold ${
              !hasUnread ? 'text-text-subtlest' : 'text-text-default'
            }`}
          >
            모두 읽음
          </p>
        </button>
      </div>

      {notifications.length === 0 ? (
        <OwnerAlertEmptyState />
      ) : (
        notifications.map((n) => {
          const ownerType =
            n.notificationType === 'NEW_ORDER_REQUEST' ||
            n.notificationType === 'ORDER_ACCEPT_DEADLINE_12H' ||
            n.notificationType === 'ORDER_ACCEPT_DEADLINE_1H'
              ? n.notificationType
              : 'NEW_ORDER_REQUEST';

          return (
            <div
              key={n.notificationId}
              className="w-full cursor-pointer"
              onClick={() =>
                onNotificationClick(n.notificationId, n.referenceId)
              }
            >
              <OwnerAlertComponent
                notificationType={ownerType}
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
