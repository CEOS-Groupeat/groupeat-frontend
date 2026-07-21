'use client';

import BackButton from '@/components/ui/BackButton';
import { useNotificationSettings } from './_hooks/useNotificationSettings';
import { useUpdateNotificationSettings } from './_hooks/useUpdateNotificationSettings';
import { useFCMToken } from '@/lib/firebase/_hooks/useFCMToken';

export default function CustomerAlertPage() {
  const { data: settings, isLoading } = useNotificationSettings();
  const { mutate: updateSettings, isPending } = useUpdateNotificationSettings();
  const { enableNotification, disableNotification } = useFCMToken();

  const isOrderAlertOn = settings?.orderStatusNotificationAgreed ?? false;
  const isMarketingOn = settings?.marketingAgreed ?? false;

  const handleToggleOrderAlert = async () => {
    const next = !isOrderAlertOn;

    if (next) {
      const success = await enableNotification();
      if (!success) {
        return; // 브라우저 권한 거부 시, 서버 값도 바꾸지 않음
      }
    } else {
      await disableNotification();
    }

    updateSettings({ orderStatusNotificationAgreed: next });
  };

  const handleToggleMarketing = () => {
    updateSettings({ marketingAgreed: !isMarketingOn });
  };

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background-default">
        <span className="text-sm text-text-subtle">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh flex justify-center items-start bg-background-default">
      <main className="w-full flex flex-col items-start gap-5 self-stretch">
        <div className="flex pt-10 flex-col items-center gap-2.5 self-stretch">
          <header className="flex p-4 items-center justify-between self-stretch">
            <BackButton />
            <h1 className="text-text-default text-headline3 font-semibold">
              알림 설정
            </h1>
            <div className="w-5" />
          </header>

          <main className="w-full flex flex-col items-start gap-3">
            {/* 주문 현황 알림 */}
            <div className="w-full flex px-4 flex-col justify-center items-start gap-3">
              <div className="w-full flex h-11 pb-3 flex-col justify-center items-start border-b border-border-subtle">
                <div className="flex py-3 justify-between items-center flex-1 self-stretch">
                  <p className="text-text-default text-body font-medium">
                    주문 현황 알림
                  </p>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOrderAlertOn}
                    onClick={handleToggleOrderAlert}
                    disabled={isPending}
                    className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
                      isOrderAlertOn ? 'bg-brand-default' : 'bg-[#C2C3C8]/70'
                    }`}
                  >
                    <div
                      className={`absolute top-0.75 w-4 h-4 rounded-full bg-[#FDFDFE] shadow-sm transition-transform duration-300 ease-in-out ${
                        isOrderAlertOn ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex px-4 flex-col justify-center items-start gap-3">
              <div className="w-full flex h-11 pb-3 flex-col justify-center items-start border-b border-border-subtle">
                <div className="flex py-3 justify-between items-center flex-1 self-stretch">
                  <p className="text-text-default text-body font-medium">
                    마케팅 정보 수신 동의
                  </p>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isMarketingOn}
                    onClick={handleToggleMarketing}
                    disabled={isPending}
                    className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
                      isMarketingOn ? 'bg-brand-default' : 'bg-[#C2C3C8]/70'
                    }`}
                  >
                    <div
                      className={`absolute top-0.75 w-4 h-4 rounded-full bg-[#FDFDFE] shadow-sm transition-transform duration-300 ease-in-out ${
                        isMarketingOn ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}
