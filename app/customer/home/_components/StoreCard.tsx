import Image from 'next/image';

import { HomeStore } from '../_types/recommendation.type';

import Star from '@/public/icons/icon_star.svg';
import Location from '@/public/icons/icon_place.svg';

interface StoreCardProps {
  store: HomeStore;
  variant?: 'small' | 'large';
}

export default function StoreCard({
  store,
  variant = 'small',
}: StoreCardProps) {
  return (
    <div
      className={`rounded-xl outline outline-1 outline-offset-[-1px] outline-border-subtle overflow-hidden shrink-0 font-['Pretendard'] 
      ${variant === 'large' ? 'w-[343px]' : 'w-48'}`}
    >
      <div
        className={`relative h-[90px] ${variant === 'large' ? 'w-[343px]' : 'w-48'}`}
      >
        <Image
          src={store.image}
          alt={store.name}
          fill
          sizes={variant === 'large' ? '343px' : '192px'}
          className="object-cover"
        />
      </div>

      <div className="p-2.5 flex flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <div className="w-fit px-1.5 py-0.5 bg-background-subtlest rounded-[4px]">
            <div className="text-caption2 font-medium text-text-subtle">
              {store.category}
            </div>
          </div>

          <div className="pl-0.5 text-text-default">
            <h3 className="text-body font-semibold tracking-tight">
              {store.name}
            </h3>
            <p className="text-label1 font-medium">{store.priceRange}</p>
          </div>
        </div>

        <div className="flex flex-col text-caption1 text-text-subtle font-normal">
          <div className="flex items-center h-[18px] gap-0.5">
            <Star className="size-3.5 text-icon-star" />
            <span>
              {store.rating} ({store.reviewCount})
            </span>
          </div>

          <div className="flex items-center h-[18px] gap-0.5">
            <Location className="size-3.5" />
            <span>{store.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
