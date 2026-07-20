/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import SignupHeader from '@/components/signup/SignupHeader';
import { fetchClient } from '@/lib/fetchClient';
import TermsContentModal from '@/app/signup/_components/TermsContentModal';
import { isValidBirthDate } from '@/app/customer/profile/_utils/validateBirthDate';
import CheckboxTrue from '@/public/icons/icon_checkboxTrue.svg';
import CheckboxFalse from '@/public/icons/icon_checkboxFalse.svg';
import DefaultButton from '@/components/ui/ButtonDefault';
import InputField from '@/components/ui/InputField';
import { useSignupStore } from '@/store/useSignupStore';
import ToastError from '@/components/ui/ToastError';
import SuccessToast from '@/components/ui/SuccessToast';

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

interface Term {
  termsId: number;
  title: string;
  content: string;
  required: boolean;
  targetType: string;
  version: string;
}

function CustomerSignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlMemberId = searchParams.get('memberId');
  const urlMemberType = searchParams.get('memberType');

  const { memberId, setMemberId, memberType, setMemberType } = useSignupStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (urlMemberId && !memberId) {
      setMemberId(Number(urlMemberId));
    }
    if (urlMemberType && !memberType) {
      if (urlMemberType === 'CUSTOMER' || urlMemberType === 'BUSINESS') {
        setMemberType(urlMemberType);
      }
    }
  }, [
    urlMemberId,
    urlMemberType,
    memberId,
    memberType,
    setMemberId,
    setMemberType,
  ]);

  const finalMemberId = memberId || (urlMemberId ? Number(urlMemberId) : null);

  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [birthDateError, setBirthDateError] = useState(false);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);

  const [checkedTerms, setCheckedTerms] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { data: terms = [] } = useQuery<Term[]>({
    queryKey: ['terms', 'CUSTOMER'],
    queryFn: async () => {
      const response = (await fetchClient(
        '/api/terms?targetType=CUSTOMER'
      )) as ApiResponse<Term[]>;

      const payload =
        response.isSuccess !== undefined ? response : (response as any).data;
      return payload.data || [];
    },
  });

  const toggleTerm = (termId: number) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const hasRequiredName = name.trim() !== '';
  const hasAllRequiredTerms =
    terms.length > 0 &&
    terms
      .filter((term) => term.required)
      .every((term) => checkedTerms[term.termsId]);
  const hasValidBirthDate = birthDate === '' || isValidBirthDate(birthDate);
  const isFormValid =
    hasRequiredName && hasAllRequiredTerms && hasValidBirthDate;

  const handleSubmitClick = () => {
    if (!hasRequiredName) {
      setIsNameError(true);
      return;
    }

    if (birthDate && !isValidBirthDate(birthDate)) {
      setBirthDateError(true);
      return;
    }

    if (!hasAllRequiredTerms) {
      setToastMessage('필수 약관에 동의해주세요.');
      setTimeout(() => setToastMessage(null), 2000);
      return;
    }

    submitSignupMutation.mutate();
  };

  const submitSignupMutation = useMutation({
    mutationFn: async () => {
      if (!finalMemberId) {
        throw new Error('회원 식별 정보가 없습니다. 다시 시도해주세요.');
      }

      const agreements = terms.map((term) => ({
        termsId: term.termsId,
        agreed: !!checkedTerms[term.termsId],
      }));

      const payload = {
        memberId: finalMemberId,
        agreements,
        name,
        email,
        birthDate,
        gender,
      };

      const response = (await fetchClient('/api/signup/customer', {
        method: 'POST',
        body: JSON.stringify(payload),
      })) as any;

      const result =
        response.isSuccess !== undefined ? response : response.data;
      if (!result?.isSuccess) {
        throw new Error(result?.message || '회원가입 처리에 거절당했습니다.');
      }

      return result;
    },
    onSuccess: () => {
      setShowSuccessToast(true);
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    },
    onError: (error: any) => {
      console.error(error);
      alert(error.message || '회원가입 처리 중 오류가 발생했습니다.');
    },
  });

  return (
    <div className="flex flex-col w-full bg-white px-4 min-h-screen relative">
      <SignupHeader showBackButton={false} />

      <div className="flex-1 flex flex-col gap-3 mt-5 pb-24">
        <h2 className="text-body text-text-default font-semibold">
          추가 정보 입력
        </h2>

        <div className="flex flex-col gap-4.5">
          {/* 1. 이름 입력 */}
          <div className="flex flex-col items-start w-full">
            <InputField
              id="userName"
              label="이름"
              required
              type="text"
              value={name}
              placeholder="이름 입력"
              onChange={(e: any) => {
                setName(e.target.value);
                if (isNameError) setIsNameError(false);
              }}
              onBlur={() => {
                if (name.trim() === '') setIsNameError(true);
              }}
            />
          </div>

          {/* 2. 생년월일 입력 */}
          <div className="flex flex-col">
            <InputField
              label="생년월일"
              id="userBirth"
              type="text"
              value={birthDate}
              placeholder="YYYY-MM-DD"
              onChange={(e: any) => {
                setBirthDate(e.target.value);
                if (birthDateError) setBirthDateError(false);
              }}
              onBlur={() => {
                if (birthDate && !isValidBirthDate(birthDate)) {
                  setBirthDateError(true);
                }
              }}
              inputClassName={birthDateError ? '!outline-status-danger' : ''}
            />
            {birthDateError && (
              <span className="text-status-danger text-caption1">
                YYYY-MM-DD 형식으로 입력해주세요
              </span>
            )}
          </div>

          {/* 3. 이메일 입력 */}
          <div className="flex flex-col gap-2">
            <InputField
              label="이메일"
              id="userEmail"
              type="email"
              value={email}
              placeholder="이메일 입력"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          {/* 4. 성별 선택 (이 부분은 버튼이므로 유지) */}
          <div className="flex flex-col gap-2">
            <label className="text-label1 text-text-default font-medium">
              성별
            </label>
            <div className="flex w-full items-center gap-3">
              <button
                onClick={() => setGender('MALE')}
                className={`flex-1 h-11 rounded-lg border transition-colors ${
                  gender === 'MALE'
                    ? 'border-transparent bg-brand-background text-brand-default font-semibold'
                    : 'border-border-strong bg-white text-text-default'
                }`}
              >
                남
              </button>
              <button
                onClick={() => setGender('FEMALE')}
                className={`flex-1 h-11 rounded-lg border transition-colors ${
                  gender === 'FEMALE'
                    ? 'border-transparent bg-brand-background text-brand-default font-semibold'
                    : 'border-border-strong bg-white text-text-default'
                }`}
              >
                여
              </button>
            </div>
          </div>

          {/* 5. 약관 동의 영역 */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-label1 text-text-default font-medium">
              고객 약관 동의 <span className="text-brand-default">*</span>
            </p>
            {terms.map((term) => (
              <div
                key={term.termsId}
                className="flex justify-between items-center self-stretch"
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-left"
                  onClick={() => toggleTerm(term.termsId)}
                >
                  {checkedTerms[term.termsId] ? (
                    <CheckboxTrue width={24} height={24} />
                  ) : (
                    <CheckboxFalse width={24} height={24} />
                  )}
                  <span className="text-label1">
                    {term.title}
                    {term.required ? (
                      <span className="text-label1 text-text-strong ml-1 mr-2">
                        (필수)
                      </span>
                    ) : (
                      <span className="text-label1 text-text-strong ml-1 mr-2">
                        (선택)
                      </span>
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => setSelectedTerm(term)}
                >
                  <p className="text-text-subtlest text-caption1 underline">
                    보기
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="app-container bottom-6 px-4">
        <div className="w-full flex flex-col gap-3.5 justify-center items-center">
          {toastMessage && <ToastError text={toastMessage} />}
          <DefaultButton
            onClick={handleSubmitClick}
            disabled={submitSignupMutation.isPending || !hasRequiredName}
          >
            {submitSignupMutation.isPending ? '처리 중...' : '다음'}
          </DefaultButton>
        </div>
      </div>

      {selectedTerm && (
        <TermsContentModal
          title={selectedTerm.title}
          content={selectedTerm.content}
          onClose={() => setSelectedTerm(null)}
        />
      )}
      {showSuccessToast && (
        <SuccessToast text="고객 회원가입이 완료되었습니다." bottom={96} />
      )}
    </div>
  );
}

export default function CustomerSignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full min-h-screen items-center justify-center bg-white text-text-default">
          로딩 중...
        </div>
      }
    >
      <CustomerSignupForm />
    </Suspense>
  );
}
