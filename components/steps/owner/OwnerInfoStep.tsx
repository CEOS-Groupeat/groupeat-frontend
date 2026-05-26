'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ButtonDefault';
import { useBusinessSignupStore } from '@/store/useBusinessSignupStore';
import TextField from '@/components/TextField';
import { useSignupStore } from '@/store/useSignupStore';

export default function OwnerInfoStep() {
  const { nextStep } = useSignupStore();
  // 설계했던 사업자 전용 스토어에서 상태 업데이트 함수를 꺼냅니다.
  const { updatePayload } = useBusinessSignupStore();

  // 입력 필드가 많으므로 객체 하나로 상태를 관리합니다.
  const [formData, setFormData] = useState({
    businessType: null as 'INDIVIDUAL' | 'CORPORATE' | null,
    representativeName: '',
    businessName: '',
    openedDate: '',
    age: '',
    email: '',
    gender: null as 'MALE' | 'FEMALE' | null,
  });

  // 공통 Input 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 사업자 유형 및 성별 변경 핸들러
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (name: 'businessType' | 'gender', value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 필수값 검증 로직
  const isFormValid =
    formData.businessType !== null &&
    formData.representativeName.trim() !== '' &&
    formData.businessName.trim() !== '' &&
    formData.openedDate.trim() !== '';

  const handleNext = () => {
    updatePayload({
      businessType: formData.businessType,
      representativeName: formData.representativeName,
      businessName: formData.businessName,
      openedDate: formData.openedDate,
      email: formData.email,
      age: formData.age ? Number(formData.age) : null,
      gender: formData.gender,
    });

    nextStep();
  };

  return (
    <div className="flex flex-col items-start gap-3 self-stretch mt-3 pb-24 bg-white min-h-screen">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        <div className="flex w-full flex-col items-start gap-6">
          <h2 className="text-body font-semibold text-text-default mt-2">
            추가 정보 입력
          </h2>

          <div className="flex flex-col items-start gap-6 self-stretch w-full">
            {/* 1. 사업자 유형 선택 (필수) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-label1 text-text-default font-medium">
                사업자 유형 <span className="text-brand-default">*</span>
              </label>
              <div className="flex w-full items-center gap-3">
                <button
                  onClick={() => handleSelect('businessType', 'INDIVIDUAL')}
                  className={`flex-1 h-11 rounded-lg border transition-colors duration-200 ${
                    formData.businessType === 'INDIVIDUAL'
                      ? 'border-transparent bg-brand-background text-brand-default font-semibold'
                      : 'border-border-default bg-white text-text-default'
                  }`}
                >
                  개인사업자
                </button>
                <button
                  onClick={() => handleSelect('businessType', 'CORPORATE')}
                  className={`flex-1 h-11 rounded-lg border transition-colors duration-200 ${
                    formData.businessType === 'CORPORATE'
                      ? 'border-transparent bg-brand-background text-brand-default font-semibold'
                      : 'border-border-default bg-white text-text-default'
                  }`}
                >
                  법인사업자
                </button>
              </div>
            </div>

            {/* 2. 대표자명 입력 (필수) */}
            <TextField
              label="대표자명"
              required
              name="representativeName"
              value={formData.representativeName}
              onChange={handleChange}
              placeholder="대표자명 입력"
            />

            {/* 3. 상호명 입력 (필수) */}
            <TextField
              label="상호명"
              required
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="상호명 입력"
            />

            {/* 4. 개업연월일 입력 (필수) */}
            <TextField
              label="개업연월일"
              required
              name="openedDate"
              value={formData.openedDate}
              onChange={handleChange}
              placeholder="YYYY-MM-DD 형식으로 입력 (예: 2026-05-24)"
            />

            {/* 5. 나이 입력 (선택) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-label1 text-text-default font-medium">
                생년월일{' '}
                <span className="text-text-subtlest font-normal text-caption1">
                  (선택)
                </span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full h-11 pl-4 pr-3 py-3 rounded-lg border border-px border-border-default placeholder:text-body placeholder:text-text-placeholder focus:outline-none focus:border-border-active"
                placeholder="숫자로 입력"
              />
            </div>

            {/* 6. 이메일 입력 (선택) */}
            <TextField
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />

            {/* 7. 성별 선택 (선택) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-label1 text-text-default font-medium">
                성별{' '}
                <span className="text-text-subtlest font-normal text-caption1">
                  (선택)
                </span>
              </label>
              <div className="flex w-full items-center gap-3">
                <button
                  onClick={() => handleSelect('gender', 'MALE')}
                  className={`flex-1 h-11 rounded-lg border transition-colors duration-200 ${
                    formData.gender === 'MALE'
                      ? 'border-transparent bg-brand-background text-brand-default font-semibold'
                      : 'border-border-default bg-white text-text-default'
                  }`}
                >
                  남
                </button>
                <button
                  onClick={() => handleSelect('gender', 'FEMALE')}
                  className={`flex-1 h-11 rounded-lg border transition-colors duration-200 ${
                    formData.gender === 'FEMALE'
                      ? 'border-transparent bg-brand-background text-brand-default font-semibold'
                      : 'border-border-default bg-white text-text-default'
                  }`}
                >
                  여
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton onClick={handleNext} disabled={!isFormValid}>
          다음
        </DefaultButton>
      </div>
    </div>
  );
}
