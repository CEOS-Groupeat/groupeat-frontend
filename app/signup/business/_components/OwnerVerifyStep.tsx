// components/OwnerVerifyStep.tsx
'use client';

import { useState, useRef } from 'react';
import DefaultButton from '@/components/ui/ButtonDefault';
import { useValidateBusiness } from '@/hooks/useValidateBusiness';
import { useBusinessSignupStore } from '@/store/useBusinessSignupStore';
import { imageAPI } from '@/src/api/image.api';
import CloseButton from '@/public/icons/icon_close.svg';

export default function OwnerVerifyStep() {
  const [inputValue, setInputValue] = useState('');

  // 1. 에러 및 상태 관리 변수 추가
  const [isError, setIsError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useValidateBusiness();
  const payload = useBusinessSignupStore((state) => state.payload);
  const updatePayload = useBusinessSignupStore((state) => state.updatePayload);

  // 사업자 번호 입력 시 동작 (글자 수 제한 및 에러 초기화)
  const handleBusinessNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNumbers.length <= 10) {
      setInputValue(onlyNumbers);
    }
    // 유저가 다시 타이핑을 시작하면 에러 상태를 초기화합니다.
    if (isError) setIsError(false);
  };

  // 사업자 조회 버튼 클릭 핸들러
  const handleValidateClick = () => {
    if (!inputValue || inputValue.length < 10) {
      setIsError(true);
      return;
    }

    mutate(
      { businessNumber: inputValue },
      {
        onSuccess: (data) => {
          if (data?.validationToken) {
            setIsError(false); // 성공 시 에러 초기화
            updatePayload({
              businessRegistrationNumber: inputValue,
              businessValidationToken: data.validationToken,
            });
            alert('사업자 인증이 완료되었습니다.');
          } else {
            setIsError(true);
          }
        },
        onError: (error) => {
          console.error(error);
          // API 검증 실패 시 에러 상태를 true로 변경하여 UI 경고를 띄웁니다.
          setIsError(true);
        },
      }
    );
  };

  // 이미지 업로드 관련 핸들러들 (기존 기능 유지)
  const handleFileAreaClick = () => {
    if (uploadedFile || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 용량은 5MB 이하만 가능합니다.');
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await imageAPI.uploadToS3(file, 'BUSINESS_DOCUMENT');

      const fileSizeString =
        file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      setUploadedFile({
        name: file.name,
        size: fileSizeString,
      });

      updatePayload({
        businessRegistrationCertificateUrl: imageUrl,
      });

      alert('사업자등록증이 정상적으로 업로드되었습니다.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || '이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    updatePayload({
      businessRegistrationCertificateUrl: '',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleNextClick = () => {
    if (isError || !payload.businessValidationToken) {
      alert('먼저 올바른 사업자 번호로 조회를 완료해주세요.');
      return;
    }
    if (!payload.businessRegistrationCertificateUrl) {
      alert('사업자등록증을 첨부해주세요.');
      return;
    }
    // 다음 스텝으로 라우팅 로직 진행
  };

  return (
    <div className="flex flex-col items-start gap-3 self-stretch mt-3 pb-24">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        <div className="flex w-full flex-col items-start gap-4">
          <h2 className="text-body font-semibold">휴대폰 본인 인증</h2>

          <div className="flex flex-col items-start gap-4.5 self-stretch w-full">
            {/* 사업자 번호 입력 및 에러 메시지 영역 포장 */}
            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex items-start gap-2 w-full">
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={10}
                  value={inputValue}
                  onChange={handleBusinessNumberChange}
                  className={`flex-1 h-11 pl-4 pr-3 py-3 rounded-lg border border-px transition-colors focus:outline-none ${
                    // 2. 에러 상태일 때 피드백 스타일에 맞춰 테두리 및 배경 변경
                    isError
                      ? 'border-status-danger bg-status-danger-bg focus:border-status-danger'
                      : 'border-border-default bg-background-default focus:border-border-active'
                  } placeholder:text-body placeholder:text-text-placeholder disabled:bg-neutral-5 disabled:text-text-disabled`}
                  placeholder="사업자 번호 입력"
                />

                {/* 3. 입력창에 글씨 유무에 따라 배경색(bg-brand-default) 및 텍스트 색상 스위칭 */}
                <button
                  onClick={handleValidateClick}
                  disabled={isPending || !inputValue}
                  className={`w-31 h-11 px-6 py-3 flex items-center justify-center rounded-lg transition-all disabled:opacity-50 ${
                    inputValue ? 'bg-brand-default' : 'bg-background-subtlest'
                  }`}
                >
                  <p
                    className={`text-label1 whitespace-nowrap ${
                      inputValue
                        ? 'text-white font-semibold'
                        : 'text-text-subtlest'
                    }`}
                  >
                    {isPending ? '조회 중...' : '사업자 조회'}
                  </p>
                </button>
              </div>

              {/* 4. 에러 발생 시 출력되는 메시지 구문 추가 */}
              {isError && (
                <p className="text-status-danger text-caption1">
                  유효하지 않은 사업자등록번호입니다
                </p>
              )}
            </div>

            {/* 숨겨진 File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />

            {/* 사업자등록증 첨부 가변 영역 */}
            <div className="flex flex-col h-29.5 items-start gap-2 self-stretch">
              <p className="text-label1 text-text-default">사업자등록증 첨부</p>

              {uploadedFile ? (
                <button
                  type="button"
                  className="w-full h-22.5 px-6 py-3 flex flex-col justify-center items-start flex-1 self-stretch border border-px border-border-default rounded-lg bg-background-subtle cursor-default"
                >
                  <div className="flex justify-between items-center self-stretch w-full">
                    <div className="flex flex-col justify-center items-start gap-1 text-left">
                      <p className="text-text-subtle text-label1 font-semibold truncate max-w-56">
                        {uploadedFile.name}
                      </p>
                      <p className="text-text-subtlest text-[13px]">
                        {uploadedFile.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 -mr-1"
                    >
                      <CloseButton className="w-6 h-6" />
                    </button>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFileAreaClick}
                  disabled={isUploading}
                  className="w-full h-22.5 px-6 py-3 flex flex-col justify-center items-start flex-1 self-stretch border border-px border-border-default rounded-lg bg-background-default hover:bg-neutral-1 transition-colors"
                >
                  <div className="flex flex-col justify-center items-start gap-1">
                    <p className="text-text-subtle text-label1">
                      {isUploading ? '업로드 중...' : '파일 선택'}
                    </p>
                    <p className="text-text-subtlest">PNG, JPG, 5MB 이하</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton
          onClick={handleNextClick}
          disabled={
            isPending || isUploading || !payload.businessValidationToken
          }
        >
          다음
        </DefaultButton>
      </div>
    </div>
  );
}
