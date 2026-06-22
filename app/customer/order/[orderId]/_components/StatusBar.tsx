'use client';

import CheckIcon from '@/public/icons/icon_check_linear.svg';

interface StatusBarProps {
  currentStep: number; // 0: 승인 대기, 1: 픽업 예정, 2: 픽업 완료
}

export default function StatusBar({ currentStep }: StatusBarProps) {
  const steps = ['승인 대기', '픽업 예정', '픽업 완료'];

  return (
    <div className="w-full inline-flex flex-col items-center justify-center gap-4">
      {/* 1. 상단 프로필 이미지 */}
      <img
        className="object-cover size-12 rounded-[999px]"
        src="https://placehold.co/52x52"
        alt="가게 프로필"
      />

      {/* 2. 상태 바 전체 컨테이너 */}
      <div className="relative flex flex-col items-center justify-start px-5 py-4 w-80 h-16 gap-2.5">
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
            const isPassed = index < currentStep; // 이미 완료된 단계
            const isCurrent = index === currentStep; // 현재 진행 중인 단계
            const isFuture = index > currentStep; // 아직 도달하지 않은 단계

            return (
              <div
                key={index}
                className="inline-flex flex-col items-center justify-start w-12 gap-3"
              >
                {/* 🎯 가져오신 3가지 노드 UI의 정확한 분기 처리 */}
                <div className="inline-flex items-center justify-center size-9">
                  {/* [상태 1] 지나간 단계 */}
                  {isPassed && (
                    <div className="size-4 bg-background-default rounded-full border-4 border-brand-default" />
                  )}

                  {/* [상태 2] 현재 단계 (그라데이션 배경 + 체크 아이콘) */}
                  {isCurrent && (
                    <div className="p-[3.33px] bg-gradient-to-b from-orange-400 to-orange-600 rounded-full inline-flex justify-center items-center">
                      <CheckIcon className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* [상태 3] 미래 단계 (회색 테두리의 빈 원) */}
                  {isFuture && (
                    <div className="size-4 bg-background-subtle rounded-full border-4 border-background-subtle" />
                  )}
                </div>

                {/* 텍스트 폰트 굵기/색상 정확한 분기 처리 */}
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
