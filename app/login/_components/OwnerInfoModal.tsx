'use client';

import Link from 'next/link';
import CheckLinear from '@/public/icons/icon_check_linear.svg';
import Close from '@/public/icons/icon_close.svg';
import OwnerIllust from '@/public/illust/illust_Client.svg';

interface OwnerInfoModalProps {
  onClose: () => void;
}

export default function OwnerInfoModal({ onClose }: OwnerInfoModalProps) {
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-background-dim/50 animate-in fade-in duration-200 cursor-default"
      />

      <div className="relative w-82 max-w-sm bg-white rounded-xl p-4 shadow-[0_0_15.2px_0_rgba(0,0,0,0.05)] min-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-icon-default hover:text-icon-active transition-colors"
          >
            <Close className="text-text-placeholder w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex flex-col w-full items-center gap-3 self-stretch">
            <OwnerIllust className="w-18 h-18" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-text-default text-[20px] text-center leading-7 font-bold">
                그루핏과 단체주문 고객을 받아보세요
              </p>
            </div>

            <div className="flex px-4 py-3 flex-col items-start gap-2.5 self-stretch rounded-lg bg-background-transparent">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center justify-center gap-1">
                  <CheckLinear className="size-5 text-[#42BE65]" />
                  <p className="text-label2 text-text-subtlest font-medium">
                    플랫폼 입점 시 단체주문 고객에게 자동 노출
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckLinear className="size-5 text-[#42BE65]" />
                  <p className="text-label2 text-text-subtlest font-medium">
                    날짜별 픽업 가능 시간 및 수량 사전 설정 가능
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckLinear className="size-5 text-[#42BE65]" />
                  <p className="text-label2 text-text-subtlest font-medium">
                    주문 승인/거절 선택 및 상세 주문 관리 가능
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center h-11 bg-brand-default mt-5 rounded-lg">
          <Link
            className="text-text-inverse text-label1 font-semibold"
            href="/signup"
          >
            우리 가게 등록하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
