'use client';

import HomeHero from './_components/HomeHero';
import FiltersContainer from './_components/FiltersContainer';
import StoreSection from './_components/StoreSection';
import { discountStores, recommendedStores } from './_mocks/stores.mock';
import CustomerNavbar from '@/components/ui/CustomerNavbar';
import { useTopRatedStores } from './_hooks/useTopRatedStores';
import { toHomeStore } from './_types/recommendation.type';

export default function CustomerHomePage() {
  const { data: topRatedData } = useTopRatedStores();
  const popularStores = (topRatedData?.stores ?? []).map(toHomeStore);

  const section1 = [
    {
      id: 'popular',
      title: '인기 만점 가게',
      description: '만족도가 높은 가게를 추천드려요',
      stores: popularStores,
    },

    {
      id: 'discount',
      title: '할인율 높은 가게',
      description: '단체 주문 시 할인율이 높은 가게를 추천드려요',
      stores: discountStores,
    },
  ];

  const section2 = [
    {
      id: 'recommended',
      title: '세빈님을 위한 맞춤 가게',
      description: '최근 주문 내역과 알맞는 새로운 가게를 추천드려요',
      stores: recommendedStores,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-col bg-background-default overflow-hidden pb-[78px]">
        <HomeHero />
        <FiltersContainer />

        {section1.map((section) => (
          <div key={section.id} className="mb-11 px-4">
            <StoreSection {...section} />
          </div>
        ))}
        <div className="mb-11 px-4">
          <StoreSection {...section2[0]} variant="large" />
        </div>

        <CustomerNavbar />
      </div>
    </div>
  );
}
