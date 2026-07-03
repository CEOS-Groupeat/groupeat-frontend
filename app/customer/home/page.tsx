{
  /* 고객 메인 페이지입니다. */
}
import HomeHero from './_components/HomeHero';
import StoreSection from './_components/StoreSection';
import SectionDivider from '@/components/ui/SectionDivider';
import {
  popularStores,
  discountStores,
  recommendedStores,
} from './_mocks/stores.mock';
import { Fragment } from 'react';
import CustomerNavbar from '@/components/ui/CustomerNavbar';

export default async function CustomerHomePage() {
  // MVP 구현범위: 고객 메인 페이지-가게 추천 api 대신 mocks 데이터로 구현.
  const sections = [
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

    {
      id: 'recommended',
      title: '세빈님을 위한 맞춤 가게',
      description: '최근 주문 내역과 알맞는 새로운 가게를 추천드려요',
      stores: recommendedStores,
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-col bg-background-default overflow-hidden pb-16">
        <HomeHero />
        
        {sections.map((section, index) => (
          <Fragment key={section.id}>
            <div className="py-[19px] px-4">
              <StoreSection {...section} />
            </div>
            <SectionDivider
              className={`mt-1 ${index === sections.length - 1 ? 'bg-transparent' : ''}`}
            />
          </Fragment>
        ))}

        <CustomerNavbar />
      </div>
    </div>
  );
}
