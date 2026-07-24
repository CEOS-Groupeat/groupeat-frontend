'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SettingOption from '@/app/owner/settings/_components/SettingOption';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import ProfileIcon from '@/public/icons/icon_profile.svg';
import IllustClient from '@/public/illust/illust_Client.svg';
import DialogModal from '@/components/ui/DialogModal';
import { fetchClient } from '@/lib/fetchClient';
import SuccessToast from '@/components/ui/SuccessToast';
import { useFCMToken } from '@/lib/firebase/_hooks/useFCMToken';
import { useOwnerProfile } from '../profile/_hooks/useOwnerProfile';

// 승연: useSearchParams를 쓰는 부분만 별도 컴포넌트로 분리하여 Suspense로 감쌈.
function ProfileUpdateToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(
    () => searchParams.get('toast') === 'profile-updated'
  );

  useEffect(() => {
    if (showToast) {
      router.replace('/owner/settings');
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, router]);

  if (!showToast) return null;
  return <SuccessToast text="수정이 완료되었습니다" bottom={102} />;
}

export default function OwnerMyPage() {
  const router = useRouter();
  const { data: account } = useOwnerProfile();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { disableNotification } = useFCMToken();

  const executeLogout = async () => {
    try {
      // FCM 토큰 먼저 비활성화 (알림 오발송 방지)
      await disableNotification();

      const response = (await fetchClient('/api/auth/logout', {
        method: 'POST',
      })) as { isSuccess?: boolean; message?: string };

      if (response?.isSuccess) {
        setIsLogoutModalOpen(false);
        alert('로그아웃되었습니다. 로그인 페이지로 이동합니다.');
        router.push('/login');
      } else {
        alert(response?.message || '로그아웃 처리에 실패했습니다.');
      }
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다.');
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-full flex h-dvh flex-col items-start gap-6 bg-background-default">
      <section className="flex flex-col justify-between items-center flex-1 self-stretch">
        <div className="flex flex-col items-center gap-4 self-stretch">
          <header className="flex pt-10 flex-col items-start justify-center gap-2.5 self-stretch">
            <div className="w-full flex items-center justify-between p-4">
              <div />
              <h1 className="text-text-default text-headline3 font-semibold">
                MY
              </h1>
              <div />
            </div>
          </header>

          <main className="w-full flex flex-col items-center gap-5 px-4">
            <section className="w-full flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-4">
                <ProfileIcon className="w-21 h-21" />
                <p className="text-text-default text-headline2 font-semibold">
                  {account?.name ?? ''}
                </p>
              </div>
            </section>

            <section className="flex pb-8 flex-col items-start gap-3 self-stretch w-full">
              <Link href="/owner/profile" className="w-full">
                <SettingOption text="프로필" icon="profile" />
              </Link>
              <Link href="/owner/info" className="w-full">
                <SettingOption text="사업자 정보" icon="bag" />
              </Link>
              <Link href="/owner/settings/alert" className="w-full">
                <SettingOption text="알림 설정" icon="alarm" />
              </Link>
              <Link href="/owner/terms?targetType=BUSINESS" className="w-full">
                <SettingOption text="약관" icon="terms" />
              </Link>
            </section>
          </main>
        </div>
      </section>

      <div className="app-container bottom-0">
        <div className="w-full flex flex-col justify-center items-center relative">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full text-text-subtlest text-label2 underline absolute bottom-24.5 left-1/2 -translate-x-1/2"
          >
            로그아웃
          </button>
          <OwnerNavbar />
        </div>
      </div>

      {isLogoutModalOpen && (
        <DialogModal
          icon={<IllustClient className="w-11 h-11" />}
          title="로그아웃 하시겠습니까?"
          onClose={() => setIsLogoutModalOpen(false)}
          primaryButton={{
            label: '돌아가기',
            onClick: () => setIsLogoutModalOpen(false),
          }}
          secondaryButton={{
            label: '로그아웃',
            onClick: executeLogout,
          }}
        />
      )}

      {/* 승연: my-프로필 페이지 토스트 코드입니다. */}
      <Suspense fallback={null}>
        <ProfileUpdateToast />
      </Suspense>
    </div>
  );
}
