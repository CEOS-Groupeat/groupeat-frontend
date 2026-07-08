'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SettingOption from '@/app/owner/settings/_components/SettingOption';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import ProfileIcon from '@/public/icons/icon_profile.svg';
import { fetchClient } from '@/lib/fetchClient';

export default function OwnerMyPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = (await fetchClient('/api/auth/logout', {
        method: 'POST',
      })) as { isSuccess?: boolean; message?: string };

      if (response?.isSuccess) {
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
              <Link href="/profile" className="w-full">
                <SettingOption text="프로필" icon="profile" />
              </Link>
              <Link href="/owner/info" className="w-full">
                <SettingOption text="사업자 정보" icon="bag" />
              </Link>
              <Link href="/alert" className="w-full">
                <SettingOption text="알림 설정" icon="alarm" />
              </Link>
              <Link href="/terms?targetType=BUSINESS" className="w-full">
                <SettingOption text="약관" icon="terms" />
              </Link>
            </section>
          </main>
        </div>
      </section>

      <div className="fixed bottom-0 w-full">
        <div className="w-full flex flex-col justify-center items-center relative">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-text-subtlest text-label2 underline absolute bottom-24.5 left-1/2 -translate-x-1/2"
          >
            로그아웃
          </button>
          <OwnerNavbar />
        </div>
      </div>
    </div>
  );
}
