import Image from 'next/image';
import Star from '@/public/icons/icon_star.svg';
import Location from '@/public/icons/icon_place.svg';
import BadgeCategory from '@/components/ui/BadgeCategory';
import type { Store } from '@/app/customer/search/_types/store.type';

interface StoreCardProps {
  store: Store;
  onClick?: () => void;
}

export default function StoreCard({ store, onClick }: StoreCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-42 h-[214px] rounded-xl outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col overflow-hidden text-left font-['Pretendard']"
    >
      <div className="relative w-full h-24">
        <Image
          //imageUrl이 잘못된 형식으로 올 경우 방어 처리
          src={
            store.imageUrl?.startsWith('/') ||
            store.imageUrl?.startsWith('http://') ||
            store.imageUrl?.startsWith('https://')
              ? store.imageUrl
              : `/images/image_logo.png`
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
            <div className="pl-0.5 flex flex-col text-text-default">
              <span className="text-label1 font-semibold">{store.name}</span>
              <span className="text-caption1 font-medium">
                {store.minPrice.toLocaleString()}원 ~{' '}
                {store.maxPrice.toLocaleString()}원/개
              </span>
            </div>
          </div>

          {/* 별점 + 위치 => 위치코드는 추후 수정 예정 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <Star className="size-3.5 text-icon-star" />
              <span className="text-caption2 text-text-subtle">
                {store.rating}
              </span>
            </div>
            {store.pickupTimeRange && (
              <div className="flex items-center gap-0.5">
                <Location className="size-3.5" />
                <span className="text-caption2 text-text-subtle">
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
