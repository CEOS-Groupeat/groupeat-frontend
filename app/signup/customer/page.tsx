/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// app/signup/customer/page.tsx
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import SignupHeader from '@/components/signup/SignupHeader';
import { fetchClient } from '@/lib/fetchClient';
import CheckboxTrue from '@/public/icons/icon_checkboxTrue.svg';
import CheckboxFalse from '@/public/icons/icon_checkboxFalse.svg';
import DefaultButton from '@/components/ui/ButtonDefault';
import { useSignupStore } from '@/store/useSignupStore';
import ToastError from '@/components/ui/ToastError';

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

export default function CustomerSignupPage() {
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
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);

  const [checkedTerms, setCheckedTerms] = useState<{ [key: number]: boolean }>(
    {}
  );

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

  const handleSubmitClick = () => {
    if (!hasRequiredName) {
      setIsNameError(true);
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
      alert('고객 회원가입이 완료되었습니다.');
      router.replace('/');
    },
    onError: (error: any) => {
      console.error(error);
      alert(error.message || '회원가입 처리 중 오류가 발생했습니다.');
    },
  });

  return (
    <div className="flex flex-col w-full bg-white px-4 min-h-screen relative">
      <SignupHeader />

      <div className="flex-1 flex flex-col gap-3 mt-5 pb-24">
        <h2 className="text-body text-text-default font-semibold">
          추가 정보 입력
        </h2>

        <div className="flex flex-col gap-6">
          {/* 1. 이름 입력 */}
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="userName"
              className="text-label1 text-text-default font-medium"
            >
              이름 <span className="text-brand-default">*</span>
            </label>
            <input
              id="userName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (isNameError) setIsNameError(false); // 타이핑 시 에러 해제
              }}
              onBlur={() => {
                if (name.trim() === '') setIsNameError(true); // 포커스 풀릴 때 빈 값이면 에러 트리거
              }}
              className={`w-full h-11 p-3 pl-4 rounded-lg border border-px transition-colors ${
                isNameError
                  ? 'border-status-danger'
                  : 'border-border-strong bg-background-default focus:border-border-active'
              } placeholder:text-body placeholder:text-text-placeholder focus:outline-none disabled:bg-neutral-5 disabled:text-text-disabled`}
              placeholder="이름 입력"
            />
            {isNameError && (
              <p className="text-status-danger text-caption1">
                이름을 입력해주세요
              </p>
            )}
          </div>

          {/* 2. 생년월일 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="userBirth"
              className="text-label1 text-text-default font-medium"
            >
              생년월일 <span className="text-brand-default">*</span>
            </label>
            <input
              id="userBirth"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border-strong bg-background-default focus:ring-1 focus:ring-brand-default outline-none text-text-default"
            />
          </div>

          {/* 3. 이메일 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="userEmail"
              className="text-label1 text-text-default font-medium"
            >
              이메일
            </label>
            <input
              id="userEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border-strong bg-background-default focus:ring-1 focus:ring-brand-default outline-none"
              placeholder="이메일 입력"
            />
          </div>

          {/* 4. 성별 선택 */}
          <div className="flex flex-col gap-2">
            <label className="text-label1 text-text-default font-medium">
              성별 <span className="text-brand-default">*</span>
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
                  onClick={() => alert(term.content)}
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

      <div className="fixed bottom-6 left-0 w-full px-4">
        <div className="w-full flex flex-col gap-3.5 justify-center items-center">
          {toastMessage && (
            <div className="gap-3.5 animate-in fade-in slide-in-from-top-5 duration-300">
              <ToastError text={toastMessage} />
            </div>
          )}
          <DefaultButton
            // 수정 4: 변경된 클릭 핸들러 연결 및 disabled 조건 최소화
            onClick={handleSubmitClick}
            disabled={submitSignupMutation.isPending}
          >
            {submitSignupMutation.isPending ? '처리 중...' : '확인'}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
