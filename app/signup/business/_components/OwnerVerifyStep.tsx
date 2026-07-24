'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DefaultButton from '@/components/ui/ButtonDefault';
import { useValidateBusiness } from '@/hooks/useValidateBusiness';
import { useSignupBusiness } from '@/hooks/useValidateBusiness';
import { useBusinessSignupStore } from '@/store/useBusinessSignupStore';
import { businessDocumentAPI } from '@/src/api/businessDocument.api';
import Close from '@/public/icons/icon_close.svg';
import SuccessToast from '@/components/ui/SuccessToast';
import ToastError from '@/components/ui/ToastError';

export default function OwnerVerifyStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryMemberId = searchParams.get('memberId')
    ? Number(searchParams.get('memberId'))
    : null;

  const payload = useBusinessSignupStore((state) => state.payload);
  const updatePayload = useBusinessSignupStore((state) => state.updatePayload);
  const resetPayload = useBusinessSignupStore((state) => state.resetPayload);

  const [inputValue, setInputValue] = useState(
    payload.businessRegistrationNumber || ''
  );
  const [isError, setIsError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const showSuccess = (message: string) => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    setSuccessMessage(message);
    setShowSuccessToast(true);
    successTimerRef.current = setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };

  const showError = (message: string) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(message);
    setShowErrorToast(true);
    errorTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
    }, 2000);
  };

  const validateMutation = useValidateBusiness();
  const signupBusinessMutation = useSignupBusiness();

  const isValidated = !!payload.businessValidationToken;

  const handleBusinessNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNumbers.length <= 10) {
      setInputValue(onlyNumbers);
    }
    if (isError) setIsError(false);
  };

  const handleValidateClick = () => {
    if (!inputValue || inputValue.length < 10) {
      setIsError(true);
      return;
    }

    validateMutation.mutate(
      { businessNumber: inputValue },
      {
        onSuccess: (data) => {
          if (data?.validationToken) {
            setIsError(false);
            updatePayload({
              businessRegistrationNumber: inputValue,
              businessValidationToken: data.validationToken,
            });
            showSuccess('사업자 인증이 완료되었습니다.');
          } else {
            setIsError(true);
          }
        },
        onError: () => {
          setIsError(true);
        },
      }
    );
  };

  const handleFileAreaClick = () => {
    if (uploadedFile || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      setIsUploading(true);
      const imageUrl =
        await businessDocumentAPI.uploadBusinessRegistrationToS3(file);

      const fileSizeString =
        file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      setUploadedFile({ name: file.name, size: fileSizeString });

      updatePayload({
        businessRegistrationCertificateUrl: imageUrl,
      });

      showSuccess('사업자등록증이 정상적으로 업로드되었습니다.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showError(error.message || '이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    updatePayload({ businessRegistrationCertificateUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleNextClick = () => {
    if (!payload.businessValidationToken) {
      showError('먼저 사업자 번호 조회를 완료해주세요.');
      return;
    }
    if (!payload.businessRegistrationCertificateUrl) {
      showError('사업자등록증 서류를 첨부해주세요.');
      return;
    }

    const finalSignupBody = {
      memberId: queryMemberId ?? payload.memberId ?? 0,
      agreements: payload.agreements.map((agree) => ({
        termsId: agree.termsId,
        agreed: agree.agreed,
      })),
      businessType: payload.businessType ?? 'INDIVIDUAL',
      representativeName: payload.representativeName || '',
      businessName: payload.businessName || '',
      openedDate: payload.openedDate || '',
      businessValidationToken: payload.businessValidationToken,
      businessRegistrationCertificateUrl:
        payload.businessRegistrationCertificateUrl,
      email: payload.email || '',
      birthDate: payload.birthDate || '',
      gender: (payload.gender as 'MALE' | 'FEMALE' | 'NONE') ?? 'NONE',
    };

    signupBusinessMutation.mutate(finalSignupBody, {
      onSuccess: (data) => {
        showSuccess(
          data?.message ||
            '사업자 등록증 확인까지 1~2일 소요됩니다. 개별 연락을 기다려주세요!'
        );
        resetPayload();
        if (data?.businessVerificationStatus === 'PENDING') {
          setTimeout(() => {
            router.replace('/login?toast=business-pending');
          }, 2000);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        showError(`회원가입 실패: ${error.message}`);
      },
    });
  };

  const isSubmitPending = signupBusinessMutation.isPending;

  return (
    <div className="flex flex-col items-start gap-3 self-stretch mt-3 pb-24">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        <div className="flex w-full flex-col items-start gap-3">
          <h2 className="text-body font-semibold">사업자 인증</h2>

          <div className="flex flex-col items-start gap-4.5 self-stretch w-full">
            <div className="flex flex-col items-start w-full gap-2">
              <p className="text-label1 text-text-default">사업자등록번호</p>
              <div className="flex items-start gap-2 w-full">
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={10}
                  value={inputValue}
                  onChange={handleBusinessNumberChange}
                  className={`flex-1 min-w-0 h-11 pl-4 pr-3 py-3 rounded-lg border border-px transition-colors focus:outline-none ${
                    isError
                      ? 'border-status-danger focus:border-status-danger'
                      : 'border-border-default bg-background-default focus:border-border-active'
                  }`}
                  placeholder="사업자등록번호 입력"
                />
                <button
                  onClick={handleValidateClick}
                  disabled={
                    validateMutation.isPending || !inputValue || isValidated
                  }
                  className={`w-31 h-11 px-6 py-3 flex items-center justify-center rounded-lg transition-all ${
                    isValidated ? 'bg-background-subtlest' : 'bg-brand-default'
                  }`}
                >
                  <p
                    className={`text-label1 whitespace-nowrap font-semibold ${isValidated ? 'text-text-subtlest' : 'text-text-inverse'}`}
                  >
                    {validateMutation.isPending
                      ? '조회 중...'
                      : isValidated
                        ? '인증 완료'
                        : '사업자 조회'}
                  </p>
                </button>
              </div>
              {isError && (
                <p className="text-status-danger text-caption1">
                  유효하지 않은 사업자등록번호입니다
                </p>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />

            <div className="flex flex-col h-29.5 items-start gap-2 self-stretch">
              <p className="text-label1 text-text-default">사업자등록증 첨부</p>
              {uploadedFile ? (
                <div className="w-full h-22.5 px-6 py-3 flex flex-col justify-center items-start flex-1 self-stretch border border-px border-border-default rounded-lg bg-background-subtle">
                  <div className="flex justify-between items-center self-stretch w-full">
                    <div className="flex flex-col justify-center items-start gap-1 text-left">
                      <p className="text-text-subtle text-label1 font-semibold truncate max-w-56">
                        {uploadedFile.name}
                      </p>
                      {uploadedFile.size && (
                        <p className="text-text-subtlest text-[13px]">
                          {uploadedFile.size}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 -mr-1"
                    >
                      <Close className="size-6 text-icon-subtle" />
                    </button>
                  </div>
                </div>
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

      <div className="app-container bottom-6 flex justify-center px-4">
        <DefaultButton
          onClick={handleNextClick}
          disabled={
            validateMutation.isPending ||
            isUploading ||
            isSubmitPending ||
            !payload.businessValidationToken
          }
        >
          {isSubmitPending ? '가입 신청 중...' : '회원가입 완료'}
        </DefaultButton>
        {showSuccessToast && <SuccessToast text={successMessage} bottom={96} />}
        {showErrorToast && <ToastError text={errorMessage} bottom={96} />}
      </div>
    </div>
  );
}
