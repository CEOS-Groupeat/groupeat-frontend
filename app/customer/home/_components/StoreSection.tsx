'use client';

import { useRouter } from 'next/navigation';
import RightChevron from '@/public/icons/icon-right_chevron.svg';
import RightGradientOverlay from '@/public/components/gradient_overlay_right.svg';
import IllustClientHome from '@/public/illust/illust_Client.svg';

import StoreCard from './StoreCard';

import { HomeStore } from '../_types/recommendation.type';

interface StoreSectionProps {
  title: string;
  description: string;
  stores: HomeStore[];
  variant?: 'small' | 'large';
  sortType?: string;
  isComingSoon?: boolean;
}

export default function StoreSection({
  title,
  description,
  stores,
  variant,
  sortType,
  isComingSoon = false,
}: StoreSectionProps) {
  const router = useRouter();

  const handleMoreClick = () => {
    if (!sortType) return;
    router.push(`/customer/search?sortType=${sortType}`);
  };

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-0.5 font-['Pretendard']">
        <div className="flex items-center justify-between">
          <h2 className="text-headline3 text-text-default font-bold">
            {title}
          </h2>

          {/* 고객 맞춤 가게(목데이터) 버튼 비활성화 필요해서 && 처리 */}
          {sortType && (
            <button
              type="button"
              onClick={handleMoreClick}
              className="flex items-center justify-center"
            >
              <RightChevron className="size-5 text-text-subtlest pl-2.5" />
            </button>
          )}
        </div>

        <p className="text-caption1 font-normal text-text-subtlest">
          {description}
        </p>
      </div>

      <div className="relative flex">
        <div
          className={`flex gap-2 ${
            isComingSoon ? 'overflow-hidden' : 'overflow-x-auto scrollbar-hide'
          }`}
        >
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} variant={variant} />
          ))}
        </div>
        {isComingSoon && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-[343px] flex flex-col gap-1 bg-background-transparent rounded-xl backdrop-blur-sm items-center justify-center">
            <IllustClientHome className="size-11 mb-1" />
            <span className="text-label-normal text-body font-semibold">
              아직 준비 중인 기능이에요
            </span>
            <p className="text-label2 font-normal text-label-light">
              조금만 기다려주세요!
            </p>
          </div>
        )}

        <RightGradientOverlay className="absolute right-0 top-0 pointer-events-none" />
      </div>
    </section>
  );
}
