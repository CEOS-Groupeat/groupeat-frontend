import HeartIcon from '@/public/icons/icon_heartOn.svg';

interface FavoritesRowProps {
  category: string;
  storeName: string;
  costs: string;
  reviewScore: number;
  reviewCount: number;
  location: string;
}

export default function FavoritesRow({
  category,
  storeName,
  costs,
  reviewScore,
  reviewCount,
  location,
}: FavoritesRowProps) {
  return (
    <section className="w-full flex items-start gap-2">
      <div className="flex flex-col justify-center items-center flex-1">
        
      </div>
      <HeartIcon className="w-8 h-8" />
    </section>
  );
}
