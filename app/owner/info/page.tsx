'use client';

import { useQuery } from '@tanstack/react-query';
import BackButton from '@/components/ui/BackButton';
import InputField from '@/components/ui/InputField';
import AlertIcon from '@/public/icons/icon_alert.svg';
// import { fetchClient } from '@/lib/fetchClient'; // TODO: 실제 API 연동 시 주석 해제

// 💡 1. 향후 백엔드에서 내려줄 데이터 스키마 타입 정의
// TODO: schema.d.ts에 실제 API 타입이 추가되면 교체해 주세요.
interface OwnerInfoData {
  representativeName: string;
  businessName: string;
  openingDate: string;
  businessType: string;
  businessNumber: string;
  certificateFileName: string;
  certificateFileUrl: string;
}

// 💡 2. API가 없을 때 사용할 가짜 데이터 패칭 함수 (0.5초 딜레이 시뮬레이션)
// TODO: 백엔드 API가 개발되면 이 함수를 지우고 fetchClient 로직으로 교체해 주세요.
const fetchMockOwnerInfo = async (): Promise<OwnerInfoData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        representativeName: '안세빈',
        businessName: 'Groupeat',
        openingDate: '2003.09.30',
        businessType: '개인 사업자',
        businessNumber: '0012345678',
        certificateFileName: '파일명.pdf',
        certificateFileUrl:
          'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // 임시 PDF 링크
      });
    }, 500);
  });
};

export default function OwnerInfoPage() {
  // 💡 3. React Query를 이용한 데이터 패칭
  const { data: ownerInfo, isLoading } = useQuery<OwnerInfoData>({
    queryKey: ['ownerInfo'],
    queryFn: fetchMockOwnerInfo,
    /* TODO: 실제 API 연동 시 queryFn을 아래와 같이 변경해 주세요.
    queryFn: async () => {
      const res = await fetchClient('/api/owner/info');
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    }
    */
  });

  // 💡 4. 사업자등록증 클릭 핸들러
  const handleCertificateClick = () => {
    if (ownerInfo?.certificateFileUrl) {
      // 새 창에서 PDF 띄우기 (모바일 환경 등에서는 다운로드로 동작할 수 있음)
      window.open(ownerInfo.certificateFileUrl, '_blank');
    } else {
      alert('등록된 사업자등록증 파일이 없습니다.');
    }
  };

  if (isLoading || !ownerInfo) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-background-default text-text-subtlest">
        사업자 정보를 불러오는 중입니다...
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
              사업자 정보
            </h1>
            <div className="w-5" />
          </header>

          <section className="flex px-4 flex-col items-center self-stretch">
            <div className="flex flex-col items-start gap-6 self-stretch">
              <div className="flex flex-col items-start gap-6 self-stretch">
                <InputField
                  label="대표자명"
                  value={ownerInfo.representativeName}
                  disabled
                  
                />
                <InputField
                  label="상호명"
                  value={ownerInfo.businessName}
                  disabled
                />
                <InputField
                  label="개업연월일"
                  value={ownerInfo.openingDate}
                  disabled
                />
                <InputField
                  label="사업자 유형"
                  value={ownerInfo.businessType}
                  disabled
                />
                <InputField
                  label="사업자등록번호"
                  value={ownerInfo.businessNumber}
                  disabled
                />

                {/* 사업자등록증 조회 기능 (클릭 이벤트 추가) */}
                <div
                  className="w-full cursor-pointer relative"
                  onClick={handleCertificateClick}
                  title="클릭하여 사업자등록증 보기"
                >
                  <InputField
                    label="사업자등록증"
                    value={ownerInfo.certificateFileName}
                    disabled
                  />
                  <div className="absolute inset-0 z-10" />
                </div>
              </div>

              <div className="w-full flex items-center gap-1">
                <AlertIcon className="w-4 h-4 text-icon-subtlest" />
                <p className="text-text-subtlest text-caption1">
                  수정을 희망하실 경우 그루핏 팀으로 문의해 주세요
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
