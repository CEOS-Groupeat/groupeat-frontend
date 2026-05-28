'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CheckboxFalse from '@/public/icons/icon_checkboxFalse.svg';
import CheckboxTrue from '@/public/icons/icon_checkboxTrue.svg';
import DefaultButton from '@/components/ui/ButtonDefault';
import { fetchClient } from '@/lib/fetchClient';
import { useBusinessSignupStore } from '@/store/useBusinessSignupStore';
import { useSignupStore } from '@/store/useSignupStore';

export default function OwnerTermsStep() {
  const { nextStep } = useSignupStore();
  const { updatePayload } = useBusinessSignupStore();

  const [checkedTerms, setCheckedTerms] = useState<{ [key: number]: boolean }>(
    {}
  );

  const { data: terms = [], isLoading } = useQuery<Term[]>({
    queryKey: ['terms', 'BUSINESS'],
    queryFn: async () => {
      const response = await fetchClient('/api/terms?targetType=BUSINESS');
      return response as unknown as Term[];
    },
  });

  const isAllChecked =
    terms.length > 0 && terms.every((term) => checkedTerms[term.termsId]);

  const isAllRequiredChecked =
    terms.length > 0 &&
    terms
      .filter((term) => term.required)
      .every((term) => checkedTerms[term.termsId]);

  const toggleAll = () => {
    const newCheckedState = !isAllChecked;
    const newCheckedTerms = terms.reduce(
      (acc, term) => ({ ...acc, [term.termsId]: newCheckedState }),
      {}
    );
    setCheckedTerms(newCheckedTerms);
  };

  const toggleTerm = (termsId: number) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [termsId]: !prev[termsId],
    }));
  };

  const handleNext = () => {
    const agreementsPayload = terms.map((term) => ({
      termsId: term.termsId,
      agreed: !!checkedTerms[term.termsId],
    }));

    updatePayload({ agreements: agreementsPayload });

    nextStep();
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 text-center text-body text-text-subtlest">
        사업자 약관을 불러오는 중...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start justify-center self-stretch gap-2 mt-3 pb-24">
      <div className="flex w-full flex-col items-start gap-2">
        <h2 className="text-body font-semibold">사업자 약관 동의</h2>
      </div>

      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="flex py-3.5 items-start gap-3 self-stretch border-b border-px border-border-default">
          <button
            type="button"
            className="flex items-center gap-1.5"
            onClick={toggleAll}
          >
            {isAllChecked ? (
              <CheckboxTrue width={24} height={24} />
            ) : (
              <CheckboxFalse width={24} height={24} />
            )}
            <p className="text-label1 font-semibold">모두 동의</p>
          </button>
        </div>

        <div className="flex flex-col items-start gap-4.5 self-stretch">
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

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton onClick={handleNext} disabled={!isAllRequiredChecked}>
          다음
        </DefaultButton>
      </div>
    </div>
  );
}
