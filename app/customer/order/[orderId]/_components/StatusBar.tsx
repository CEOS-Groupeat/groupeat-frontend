'use client';

import CheckIcon from '@/public/icons/icon_check_linear.svg';
import OrderCheckIllust from '@/public/illust/illust_OrderCheck.svg';
import PickupIllust from '@/public/illust/illust_Waiting.svg';
import PickupDoneIllust from '@/public/illust/illust_PickupDone.svg';
import Ellipse from '@/public/icons/icon_ellipse.svg';

interface StatusBarProps {
  currentStep: number; // 0: 승인 대기, 1: 픽업 예정, 2: 픽업 완료
}

export default function StatusBar({ currentStep }: StatusBarProps) {
  const steps = ['승인 대기', '픽업 예정', '픽업 완료'];
  const imageLeftPositions = ['10%', '50%', '90%'];

  const stepIllusts = [OrderCheckIllust, PickupIllust, PickupDoneIllust];
  const CurrentIllust = stepIllusts[currentStep];

  return (
    <div className="w-full inline-flex flex-col items-center justify-center pt-16 pb-2">
      <div className="relative flex flex-col items-center justify-start w-80 h-16">
        <div
          className="absolute -top-17.5 h-17.5 transition-all duration-500 ease-in-out z-10 box-border"
          style={{
            left: imageLeftPositions[currentStep] || '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <CurrentIllust className="object-contain" />
        </div>

        <div className="absolute top-[18px] -translate-y-1/2 left-1/2 -translate-x-1/2 inline-flex items-center justify-start w-64 z-0">
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
        <div className="absolute top-0 left-0 inline-flex items-center justify-center w-80 gap-20 z-10">
          {steps.map((stepName, index) => {
            const isPassed = index < currentStep;
            const isCurrent = index === currentStep;
            const isFuture = index > currentStep;

            return (
              <div
                key={index}
                // gap-3(12px)가 아이콘 바닥과 텍스트 사이에 정확히 들어갑니다.
                className="inline-flex flex-col items-center justify-start w-12 gap-3"
              >
                {isPassed && (
                  <div className="flex items-center justify-center size-[36px]">
                    <div className="size-[18px] rounded-full border-4 border-brand-default">
                      <Ellipse className="text-background-default" />
                    </div>
                  </div>
                )}
                {isCurrent && (
                  <div className="flex items-center justify-center w-[48px]">
                    <div className="size-[30px] bg-gradient-to-b from-orange-400 to-orange-600 rounded-[82.50px] inline-flex justify-center items-center">
                      <CheckIcon className="size-[23.33px] text-white" />
                    </div>
                  </div>
                )}
                {isFuture && (
                  <div className="flex items-center justify-center size-[36px]">
                    <div className="size-[18px] bg-background-subtle rounded-full" />
                  </div>
                )}

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
