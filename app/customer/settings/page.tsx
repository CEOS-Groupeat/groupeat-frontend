'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SettingOption from '@/app/owner/settings/_components/SettingOption';
import ProfileIcon from '@/public/icons/icon_profile.svg';
import IllustCustomer from '@/public/illust/illust_Customer.svg';
import DialogModal from '@/components/ui/DialogModal';
import { fetchClient } from '@/lib/fetchClient';
import CustomerNavbar from '@/components/ui/CustomerNavbar';
import PickupCompleteToast from '@/app/owner/orders/_components/PickupCompleteToast';

// 승연: useSearchParams를 쓰는 부분만 별도 컴포넌트로 분리하여 Suspense로 감쌈.
function ProfileUpdateToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(
    () => searchParams.get('toast') === 'profile-updated'
  );

  useEffect(() => {
    if (showToast) {
      router.replace('/customer/settings');
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, router]);

  if (!showToast) return null;
  return <PickupCompleteToast text="수정이 완료되었습니다." />;
}

export default function CustomerSettingsPage() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const executeLogout = async () => {
    try {
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
                  안세빈
                </p>
              </div>

              <div className="w-full flex justify-center items-start gap-3">
                <div className="flex p-3 items-end gap-2.5 flex-1 rounded-lg border border-border-subtle bg-static-white">
                  <div className="flex flex-col justify-center items-center gap-1 flex-1 self-stretch">
                    <p className="text-text-default text-headline2 font-semibold">
                      4
                    </p>
                    <p className="text-text-subtlest text-label2 font-medium">
                      주문
                    </p>
                  </div>

                  <div className="h-12.5 border-[0.5px] border-border-subtle mx-2.5" />

                  <div className="flex flex-col justify-center items-center gap-1 flex-1 self-stretch">
                    <p className="text-text-default text-headline2 font-semibold">
                      3
                    </p>
                    <p className="text-text-subtlest text-label2 font-medium">
                      리뷰
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex pb-8 flex-col items-start gap-3 self-stretch w-full">
              <Link href="/customer/profile" className="w-full">
                <SettingOption text="프로필" icon="profile" />
              </Link>
              <Link href="/customer/review" className="w-full">
                <SettingOption text="내 리뷰" icon="review" />
              </Link>
              <Link
                href="/customer/terms?targetType=CUSTOMER"
                className="w-full"
              >
                <SettingOption text="약관" icon="terms" />
              </Link>
              <Link href="/alert" className="w-full">
                <SettingOption text="알림 설정" icon="alarm" />
              </Link>
            </section>
          </main>
        </div>
      </section>

      <div className="fixed bottom-0 w-full">
        <div className="w-full flex flex-col justify-center items-center relative">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full text-text-subtlest text-label2 underline absolute bottom-24.5 left-1/2 -translate-x-1/2"
          >
            로그아웃
          </button>
          <CustomerNavbar />
        </div>
      </div>

      {isLogoutModalOpen && (
        <DialogModal
          icon={<IllustCustomer className="w-11 h-11" />}
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
