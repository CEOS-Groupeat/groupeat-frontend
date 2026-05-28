import RightChevron from '@/public/icons/icon-right_chevron.svg';

import StoreCard from './StoreCard';

import { HomeStore } from '../_types/store.type';

interface StoreSectionProps {
  title: string;
  description: string;
  stores: HomeStore[];
}

export default function StoreSection({
  title,
  description,
  stores,
}: StoreSectionProps) {
  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between mb-[2px]">
          <h2 className="text-text-default text-lg font-bold font-['Pretendard'] leading-6">
            {title}
          </h2>

          {/*추후에 기능명세서보고 링크걸기*/}
          <button className="flex items-center justify-center">
            <RightChevron className="text-text-subtlest" />
          </button>
        </div>

        <p className="text-label2 text-text-subtle">{description}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
}
