'use client';

import { useRouter } from 'next/navigation';
import { useNotificationList } from '@/hooks/notifications/useNotificationList';
import { useMarkAllAsRead } from '@/hooks/notifications/useMarkAllAsRead';
import { useMarkAsRead } from '@/hooks/notifications/useMarkAsRead';
import AlertHeader from './_components/AlertHeader';
import AlertListSection from './_components/AlertListSection';

export default function CustomerAlertPage() {
  const router = useRouter();
  const { data, isLoading } = useNotificationList();
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead();
  const { mutate: markAsRead } = useMarkAsRead();

  const notifications =
    data?.pages.flatMap((page) => page?.notificationList ?? []) ?? [];

  const handleNotificationClick = (
    notificationId?: number,
    referenceId?: number
  ) => {
    if (notificationId) markAsRead(notificationId);
    if (referenceId) router.push(`/customer/order/${referenceId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background-default">
        <span className="text-sm text-text-subtle">불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center flex-col bg-background-default">
      <AlertHeader />

      <AlertListSection
        notifications={notifications}
        onReadAll={() => markAllAsRead()}
        isMarkingAll={isMarkingAll}
        onNotificationClick={handleNotificationClick}
      />
    </div>
  );
}
