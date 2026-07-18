'use client';

import Link from 'next/link';
import CheckLinear from '@/public/icons/icon_check_linear.svg';
import Close from '@/public/icons/icon_close.svg';
import CustomerIllust from '@/public/illust/illust_Customer.svg'; // 확인 필요

interface CustomerInfoModalProps {
  onClose: () => void;
}

export default function CustomerInfoModal({ onClose }: CustomerInfoModalProps) {
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
            <CustomerIllust className="w-18 h-18" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-text-default text-[20px] text-center leading-7 font-bold">
                로그인 후 그루핏을 이용해보세요
              </p>
            </div>

            <div className="flex px-4 py-3 flex-col items-start gap-2.5 self-stretch rounded-lg bg-background-transparent">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center justify-center gap-1">
                  <CheckLinear className="text-[#42BE65]" />
                  <p className="text-label2 text-text-subtlest font-medium">
                    원하는 날짜·인원·예산에 따라 딱 맞는 가게 추천
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckLinear className="text-[#42BE65]" />
                  <p className="text-label2 text-text-subtlest font-medium">
                    그루핏만의 할인율로 가장 합리적인 가격
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckLinear className="text-[#42BE65]" />
                  <p className="text-label2 text-text-subtlest font-medium">
                    정기적인 주문은 더 편하게, 원클릭 재주문
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
            회원가입 →
          </Link>
        </div>
      </div>
    </div>
  );
}
