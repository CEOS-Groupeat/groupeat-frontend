'use client';

import CheckIcon from '@/public/icons/icon_check_linear.svg';

interface StatusBarProps {
  currentStep: number; // 0: 승인 대기, 1: 픽업 예정, 2: 픽업 완료
}

export default function StatusBar({ currentStep }: StatusBarProps) {
  const steps = ['승인 대기', '픽업 예정', '픽업 완료'];
  const imageLeftPositions = ['10%', '50%', '90%'];

  return (
    <div className="w-full inline-flex flex-col items-center justify-center pt-16 pb-2">
      {/* 2. 상태 바 전체 컨테이너 */}
      <div className="relative flex flex-col items-center justify-start px-5 py-4 w-80 h-16 gap-2.5">
        <img
          src="https://placehold.co/52x52"
          alt="가게 프로필"
          className="absolute -top-16 object-cover w-[52px] h-[52px] rounded-[999px] transition-all duration-500 ease-in-out z-10 shadow-sm"
          style={{
            left: imageLeftPositions[currentStep] || '50%',
            transform: 'translateX(-50%)', // 기준점을 이미지의 정중앙으로 맞춤
          }}
        />

        {/* ─── 1층: 진행 선 ─── */}
        <div className="inline-flex items-center justify-start w-64">
          <div
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
              currentStep >= 1 ? 'bg-brand-default' : 'bg-background-subtle'
            }`}
          />
          <div
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
              currentStep >= 2 ? 'bg-brand-default' : 'bg-background-subtle'
            }`}
          />
        </div>

        {/* ─── 2층: 노드 및 텍스트 영역 ─── */}
        <div className="absolute top-0 left-0 inline-flex items-center justify-center w-80 gap-20">
          {steps.map((stepName, index) => {
            const isPassed = index < currentStep;
            const isCurrent = index === currentStep;
            const isFuture = index > currentStep;

            return (
              <div
                key={index}
                className="inline-flex flex-col items-center justify-start w-12 gap-3"
              >
                {/* 노드 UI */}
                <div className="inline-flex items-center justify-center size-9">
                  {isPassed && (
                    <div className="size-4 bg-background-default rounded-full border-4 border-brand-default" />
                  )}
                  {isCurrent && (
                    <div className="p-[3.33px] bg-gradient-to-b from-orange-400 to-orange-600 rounded-full inline-flex justify-center items-center">
                      <CheckIcon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {isFuture && (
                    <div className="size-4 bg-background-subtle rounded-full border-4 border-background-subtle" />
                  )}
                </div>

                {/* 텍스트 스타일링 */}
                <div
                  className={`self-stretch text-center text-xs leading-4 font-pretendard transition-colors duration-300 ${
                    isCurrent
                      ? 'text-text-default font-bold'
                      : isPassed
                        ? 'text-text-default font-semibold'
                        : 'text-text-subtlest font-normal'
                  }`}
                >
                  {stepName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
