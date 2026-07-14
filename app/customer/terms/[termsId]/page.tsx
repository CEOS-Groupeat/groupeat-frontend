'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import TermsViewer from '@/components/ui/TermsViewer';
import ArrowLeftIcon from '@/public/icons/icon_arrow_left_padding.svg';

interface CustomerTermDetailDTO {
  termsId: number;
  title: string;
  content: string;
  required: boolean;
  targetType: string;
  version: string;
  agreed: boolean;
  agreedAt: string;
  modifiable: boolean;
}

interface ApiResponseCustomerTermDetail {
  isSuccess: boolean;
  code: string;
  message: string;
  data: CustomerTermDetailDTO;
}

export default function CustomerTermInfoPage() {
  const params = useParams();
  const router = useRouter();
  
  const termsId = params.termsId as string;

  const { data: termDetail, isLoading, isError } = useQuery({
    queryKey: ['customerTermDetail', termsId],
    queryFn: async () => {
      const res = await fetchClient<ApiResponseCustomerTermDetail>(
        `/api/customer/mypage/terms/${termsId}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    enabled: !!termsId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background-default text-caption1 text-text-subtlest">
        약관 상세 내용을 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !termDetail) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background-default text-caption1 text-status-danger">
        약관 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="w-full min-h-dvh flex flex-col items-center bg-background-default">
      <div className="w-full flex flex-col items-start gap-3">
        <div className="flex pt-16 px-3 flex-col justify-end items-center self-stretch border-b border-border-subtle pb-2">
          <div className="w-full flex h-11 items-center justify-center gap-2">
            <header
              className="flex items-center gap-0.5 flex-1 cursor-pointer"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="w-5 h-5 text-icon-default shrink-0" />
              <h1 className="text-text-default text-headline3 font-semibold ml-2">
                {termDetail.title}
              </h1>
            </header>
          </div>
        </div>

        <main className="flex px-4 pb-16 pt-2 flex-col justify-center gap-2.5 self-stretch overflow-y-auto">
          <TermsViewer content={termDetail.content} />
        </main>
      </div>
    </div>
  );
}