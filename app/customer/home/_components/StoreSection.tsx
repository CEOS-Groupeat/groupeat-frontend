import RightChevron from '@/public/icons/icon-right_chevron.svg';
import RightGradientOverlay from '@/public/components/gradient_overlay_right.svg';

import StoreCard from './StoreCard';

import { HomeStore } from '../_types/store.type';

interface StoreSectionProps {
  title: string;
  description: string;
  stores: HomeStore[];
  variant?: 'small' | 'large';
}

export default function StoreSection({
  title,
  description,
  stores,
  variant,
}: StoreSectionProps) {
  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-0.5 font-['Pretendard']">
        <div className="flex items-center justify-between">
          <h2 className="text-headline3 text-text-default font-bold">
            {title}
          </h2>

          {/*추후 버튼 기능 추가 예정 */}
          <button type="button" className="flex items-center justify-center">
            <RightChevron className="text-text-subtlest ml-2.5" />
          </button>
        </div>

        <p className="text-caption1 font-normal text-text-subtlest">
          {description}
        </p>
      </div>

      <div className="relative flex">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} variant={variant} />
          ))}
        </div>
        <RightGradientOverlay className="absolute right-0 top-0 pointer-events-none" />
      </div>
    </section>
  );
}
