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
      className="w-full h-[132px] flex self-stretch px-4 py-2.5 border-b border-border-subtle overflow-hidden text-left font-['Pretendard']"
    >
      <div className="relative min-w-[112px] h-[94px] my-[9px]">
        <Image
          //imageUrl이 잘못된 형식으로 올 경우 방어 처리
          src={
            store.imageUrl?.startsWith('/') ||
            store.imageUrl?.startsWith('http://') ||
            store.imageUrl?.startsWith('https://')
              ? store.imageUrl
              : `/images/day-brunch.png`
          }
          alt={store.name ?? ''}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="w-full bg-background-default py-1 pl-3.5 pr-3 flex flex-col">
        <div className="flex flex-col gap-1.5">
          {/* 카테고리 + 이름 + 가격 */}
          <div className="flex flex-col gap-1">
            <BadgeCategory label={store.category ?? ''} />
            <div className="pl-0.5 flex flex-col text-text-default">
              <span className="text-body font-semibold">{store.name}</span>
              <span className="text-label2 font-medium">
                {(store.minPrice ?? 0).toLocaleString()}원 ~{' '}
                {(store.maxPrice ?? 0).toLocaleString()}원/개
              </span>
            </div>
          </div>

          {/* 별점 + 리뷰 수 + 위치 => 위치코드는 추후 수정 예정 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <Star className="size-3.5 text-icon-star" />
              <span className="text-caption2 font-normal text-text-subtle">
                {store.rating}
              </span>
              <span className="text-caption2 font-normal text-text-subtle">
                ({store.reviewCount})
              </span>
            </div>
            {store.district && (
              <div className="flex items-center gap-0.5">
                <Location className="size-3.5" />
                <span className="text-caption2 font-normal text-text-subtle">
                  {store.district}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
