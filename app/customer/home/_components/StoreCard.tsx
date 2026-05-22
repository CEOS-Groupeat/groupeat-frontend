import Image from 'next/image';

import { Store } from '../_types/store.type';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="w-48 rounded-xl outline outline-1 outline-offset-[-1px] outline-border-subtle overflow-hidden shrink-0">
      <Image
        src={store.image}
        alt={store.name}
        width={208}
        height={96}
        className="w-52 h-24 object-cover"
      />

      <div className="p-2.5 bg-background-default flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <div className="w-fit px-1.5 py-0.5 bg-background-subtlest rounded-[4px]">
            <div className="text-caption2 font-semibold text-text-subtle tracking-tight">
              {store.category}
            </div>
          </div>

          <div className="pl-0.5">
            <h3 className="text-body font-semibold text-text-default">
              {store.name}
            </h3>

            <p className="text-label1 font-medium text-text-default">
              {store.priceRange}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-xs text-text-subtle">
            <span>⭐</span>

            <span>
              {store.rating} ({store.reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-text-subtle">
            <span>📍</span>

            <span>{store.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
