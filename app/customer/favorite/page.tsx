// app/customer/favorite/page.tsx
'use client';

import FavoritesRow from '@/app/customer/favorite/_components/FavoritesRow';
import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';

const favoritesMock = [
  {
    category: '샌드위치 & 김밥',
    storeName: '데이브런치',
    costs: '7,000원 ~ 12,000원/개',
    reviewScore: 4.7,
    reviewCount: 3,
    location: '마포구 아현동',
  },
  {
    category: '샌드위치 & 김밥',
    storeName: '사르르 연남',
    costs: '5,500원 ~ 9,000원/개',
    reviewScore: 4.0,
    reviewCount: 45,
    location: '마포구 아현동',
  },
  {
    category: '샌드위치 & 김밥',
    storeName: '마이엑스',
    costs: '11,000원 ~ 20,000원/개',
    reviewScore: 4.9,
    reviewCount: 12,
    location: '마포구 아현동',
  },
];
export default function CustomerFavoritePage() {
  const handleDeleteFavorites = () => {
    //todo: 즐겨찾기 삭제로직 구현
  };
  return (
    <div className="w-full flex pb-1 flex-col items-center">
      <div className="w-full flex flex-col items-start">
        <header className="flex pt-10 flex-col items-start gap-2.5 self-stretch">
          <div className="flex p-4 items-center justify-between self-stretch">
            <ArrowLeft className="text-icon-subtle w-5 h-5" />
            <p className="text-text-default text-headline3 font-semibold">
              즐겨찾기
            </p>
            <div />
          </div>
        </header>

        <section className="flex px-4 py-1.5 justify-between items-center self-stretch">
          <p className="text-text-default text-label2 font-medium">
            즐겨찾기({favoritesMock.length})
          </p>
          <button onClick={() => handleDeleteFavorites}>
            <p className="text-text-subtle text-label2 underline leading-4.5">
              전체 삭제
            </p>
          </button>
        </section>

        {favoritesMock.map((item) => {
          return (
            <div key={item.storeName}>
              <FavoritesRow />
            </div>
          );
        })}
      </div>
    </div>
  );
}
