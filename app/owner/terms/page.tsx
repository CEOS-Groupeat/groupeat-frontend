'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import BackButton from '@/components/ui/BackButton';
import ArrowRightIcon from '@/public/icons/icon_arrow_right.svg';

interface TermDTO {
  termsId: number;
  title: string;
  content: string;
  required: boolean;
  targetType: string;
  version: string;
}

interface ApiResponseTermsList {
  isSuccess: boolean;
  message: string;
  data: TermDTO[];
}

export default function OwnerTermsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const targetType = pathname?.includes('/owner') ? 'BUSINESS' : 'CUSTOMER';

  const { data: terms, isLoading, isError } = useQuery({
    queryKey: ['terms', targetType],
    queryFn: async () => {
      const res = await fetchClient<ApiResponseTermsList>(
        `/api/owner/mypage/terms`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });

  const handleTermClick = (termsId: number) => {
    router.push(`/owner/terms/${termsId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background-default text-text-subtlest">
        약관 목록을 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !terms) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background-default text-status-danger">
        약관 정보를 불러오는데 실패했습니다.
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
              약관
            </h1>
            <div className="w-5" />
          </header>
        </div>

        <section className="w-full flex px-4 flex-col justify-center items-start gap-3">
          {terms.map((t) => (
            <div
              key={t.termsId}
              onClick={() => handleTermClick(t.termsId)}
              className="flex h-11 pb-3 flex-col justify-center items-start self-stretch border-b border-border-subtle cursor-pointer hover:bg-background-subtle transition-colors"
            >
              <div className="flex py-3 pr-1 justify-between items-center flex-1 self-stretch">
                <p className="text-text-default text-body font-medium">
                  {t.title}
                </p>
                <ArrowRightIcon className="w-5 h-5 text-icon-disable" />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}