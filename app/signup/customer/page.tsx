'use client';

// app/signup/customer/page.tsx
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import SignupHeader from '@/components/signup/SignupHeader';
import { fetchClient } from '@/lib/fetchClient';
import CheckboxTrue from '@/public/icons/icon_checkboxTrue.svg';
import CheckboxFalse from '@/public/icons/icon_checkboxFalse.svg';
import DefaultButton from '@/components/DefaultButton';
import { useSignupStore } from '@/store/useSignupStore';

// 약관 타입 정의
interface Term {
  termsId: number;
  title: string;
  content: string;
  required: boolean;
  targetType: string;
  version: string;
}

export default function CustomerSignupPage() {
  const { memberId } = useSignupStore();
  const router = useRouter();

  // 폼 상태 관리
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);

  // 약관 체크 상태
  const [checkedTerms, setCheckedTerms] = useState<{ [key: number]: boolean }>(
    {}
  );

  // 1. 서버에서 고객 약관 목록 불러오기 (GET)
  const { data: terms = [] } = useQuery<Term[]>({
    queryKey: ['terms', 'CUSTOMER'],
    queryFn: async () => {
      const response = (await fetchClient(
        '/api/terms?targetType=CUSTOMER'
      )) as Response;
      return response as unknown as Term[];
    },
  });

  const toggleTerm = (termId: number) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  // 필수값 검증
  const isFormValid =
    name.trim() !== '' &&
    terms
      .filter((term) => term.required)
      .every((term) => checkedTerms[term.termsId]);

  // 2. 고객 회원가입 최종 제출 (POST)
  const submitSignupMutation = useMutation({
    mutationFn: async () => {
      const agreements = terms.map((term) => ({
        termstermsId: term.termsId,
        agreed: !!checkedTerms[term.termsId],
      }));

      const payload = {
        memberId: memberId,
        agreements,
        name,
        email,
        birth: Number(birth),
        gender,
      };

      return fetchClient('/api/signup/customer', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      alert('고객 회원가입이 완료되었습니다.');
      router.replace('/'); // 성공 시 홈으로 리다이렉트
    },
    onError: () => {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    },
  });

  return (
    <div className="flex flex-col w-full bg-white px-4 min-h-screen">
      <SignupHeader />

      <div className="flex-1 flex flex-col gap-3 mt-5 pb-24">
        <h2 className="text-body text-text-default font-semibold">
          추가 정보 입력
        </h2>

        <div className="flex flex-col gap-6">
          {/* 1. 이름 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="userName"
              className="text-label1 text-text-default font-medium"
            >
              이름 <span className="text-brand-default">*</span>
            </label>
            <input
              id="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border-strong bg-background-default focus:ring-1 focus:ring-brand-default outline-none"
              placeholder="이름 입력"
            />
          </div>

          {/* 2. 생년월일 입력 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="userAge"
              className="text-label1 text-text-default font-medium"
            >
              생년월일
            </label>
            <input
              id="userAge"
              type="number"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-border-strong bg-background-default focus:ring-1 focus:ring-brand-default outline-none"
              placeholder="숫자로 입력"
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
              고객 약관 동의
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

      {/* 최종 제출 버튼 영역 */}
      <div className="fixed bottom-6 left-0 w-full px-4">
        <DefaultButton
          onClick={() => submitSignupMutation.mutate()}
          disabled={!isFormValid || submitSignupMutation.isPending}
        >
          {submitSignupMutation.isPending ? '처리 중...' : '확인'}
        </DefaultButton>
      </div>
    </div>
  );
}
