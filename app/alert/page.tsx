'use client';

import { useState } from 'react';
import BackButton from '@/components/ui/BackButton';

export default function CommonAlertPage() {
  const [isOrderAlertOn, setIsOrderAlertOn] = useState(false);
  const [isMarketingOn, setIsMarketingOn] = useState(false);

  return (
    <div className="w-full h-dvh flex justify-center items-start bg-background-default">
      <main className="w-full flex flex-col items-start gap-5 self-stretch">
        <div className="flex pt-10 flex-col items-center gap-2.5 self-stretch">
          <header className="flex p-4 items-center justify-between self-stretch">
            <BackButton />
            <h1 className="text-text-default text-headline3 font-semibold">
              알림 설정
            </h1>
            <div className="w-5" />
          </header>

          <main className="w-full flex flex-col items-start gap-3">
            {/* 주문 현황 알림 */}
            <div className="w-full flex px-4 flex-col justify-center items-start gap-3">
              <div className="w-full flex h-11 pb-3 flex-col justify-center items-start border-b border-border-subtle">
                <div className="flex py-3 justify-between items-center flex-1 self-stretch">
                  <p className="text-text-default text-body font-medium">
                    주문 현황 알림
                  </p>
                  
                  {/* 토글 스위치 버튼 */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOrderAlertOn}
                    onClick={() => setIsOrderAlertOn(!isOrderAlertOn)}
                    className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
                      isOrderAlertOn ? 'bg-brand-default' : 'bg-[#C2C3C8]/70'
                    }`}
                  >
                    <div
                      className={`absolute top-0.75 w-4 h-4 rounded-full bg-[#FDFDFE] shadow-sm transition-transform duration-300 ease-in-out ${
                        isOrderAlertOn ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  
                </div>
              </div>
            </div>

            <div className="w-full flex px-4 flex-col justify-center items-start gap-3">
              <div className="w-full flex h-11 pb-3 flex-col justify-center items-start border-b border-border-subtle">
                <div className="flex py-3 justify-between items-center flex-1 self-stretch">
                  <p className="text-text-default text-body font-medium">
                    마케팅 정보 수신 동의
                  </p>
                  
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isMarketingOn}
                    onClick={() => setIsMarketingOn(!isMarketingOn)}
                    className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
                      isMarketingOn ? 'bg-brand-default' : 'bg-[#C2C3C8]/70'
                    }`}
                  >
                    <div
                      className={`absolute top-0.75 w-4 h-4 rounded-full bg-[#FDFDFE] shadow-sm transition-transform duration-300 ease-in-out ${
                        isMarketingOn ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}