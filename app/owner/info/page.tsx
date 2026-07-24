'use client';

import BackButton from '@/components/ui/BackButton';
import InputField from '@/components/ui/InputField';
import AlertIcon from '@/public/icons/icon_alert.svg';
//import UploadIcon from '@/public/icons/icon-upload.svg';
import { useOwnerBusinessProfile } from './_hooks/useOwnerBusinessProfile';

const BUSINESS_TYPE_LABEL: Record<'INDIVIDUAL' | 'CORPORATION', string> = {
  INDIVIDUAL: '개인 사업자',
  CORPORATION: '법인 사업자',
};

export default function OwnerInfoPage() {
  const { data: ownerInfo, isLoading } = useOwnerBusinessProfile();

  // 추후 기능 추가 예정
  // const handleCertificateClick = () => {
  //   if (ownerInfo?.businessRegistrationCertificateUrl) {
  //     //새 창에서 PDF 띄우기 (모바일 환경 등에서는 다운로드로 동작할 수 있음)
  //     window.open(ownerInfo.businessRegistrationCertificateUrl, '_blank');
  //   } else {
  //     alert('등록된 사업자등록증 파일이 없습니다.');
  //   }
  // };

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
                  value={ownerInfo.openedDate}
                  disabled
                />
                <InputField
                  label="사업자 유형"
                  value={
                    ownerInfo.businessType
                      ? BUSINESS_TYPE_LABEL[ownerInfo.businessType]
                      : ''
                  }
                  disabled
                />
                <InputField
                  label="사업자등록번호"
                  value={ownerInfo.businessRegistrationNumber}
                  disabled
                />

                {/* 사업자등록증 조회 기능 (클릭 이벤트 추가 예정) */}
                <div
                  className="w-full cursor-pointer relative"
                  //onClick={handleCertificateClick}
                  title="클릭하여 사업자등록증 보기"
                >
                  <InputField
                    label="사업자등록증"
                    value={
                      ownerInfo.businessRegistrationCertificateUrl
                        ? '제출 완료'
                        : '등록된 사업자등록증이 없습니다'
                    }
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
