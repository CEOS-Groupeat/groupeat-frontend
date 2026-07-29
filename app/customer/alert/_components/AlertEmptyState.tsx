import NoAlarmIllust from '@/public/illust/ilust_NoAlarm.svg';

export default function AlertEmptyState() {
  return (
    <>
      <div className="w-full h-dvh flex justify-center pt-40">
        <div className="flex flex-col items-center gap-3">
          <NoAlarmIllust />
          <p className="text-text-subtle text-body font-medium">
            알림이 없습니다
          </p>
        </div>
      </div>
    </>
  );
}
