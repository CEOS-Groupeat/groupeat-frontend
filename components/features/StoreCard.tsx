import Image from 'next/image';
import Star from '@/public/icons/icon_star.svg';
import Location from '@/public/icons/icon_place.svg';
import BadgeCategory from '@/components/ui/BadgeCategory';
import type { Store } from '@/app/customer/search/_types/store.type';
//공통 타입 위치를 정하기 !

interface StoreCardProps {
  store: Store;
  onClick?: () => void;
}

export default function StoreCard({ store, onClick }: StoreCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 rounded-xl outline outline-1 outline-border-subtle inline-flex flex-col justify-center items-center overflow-hidden text-left"
    >
      <div className="relative w-full h-24">
        <Image
          //imageUrl이 잘못된 형식으로 올 경우 방어 처리
          src={
            store.imageUrl?.startsWith('/') ||
            store.imageUrl?.startsWith('http://') ||
            store.imageUrl?.startsWith('https://')
              ? store.imageUrl
              : `/${store.imageUrl}`
          }
          alt={store.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="self-stretch bg-background-default p-2.5 flex flex-col gap-2.5">
        <div className="flex flex-col gap-2">
          {/* 카테고리 + 이름 + 가격 */}
          <div className="flex flex-col gap-1.5">
            <BadgeCategory label={store.category} />
            <div className="pl-0.5 flex flex-col">
              <span className="text-sm font-semibold text-text-default leading-5">
                {store.name}
              </span>
              <span className="text-xs font-medium text-text-default leading-4">
                {store.minPrice.toLocaleString()}원 ~{' '}
                {store.maxPrice.toLocaleString()}원/개
              </span>
            </div>
          </div>

          {/* 별점 + 위치 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <Star className="size-3.5" />
              <span className="text-xs text-text-subtle leading-4">
                {store.rating}
              </span>
            </div>
            {store.pickupTimeRange && (
              <div className="flex items-center gap-0.5">
                <Location className="size-3.5" />
                <span className="text-xs text-text-subtle leading-4">
                  {store.pickupTimeRange}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
