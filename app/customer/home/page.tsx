{
  /* 고객 메인 페이지입니다. */
}
import { checkServerHealth } from '@/utils/useStoreFetch';
import Link from 'next/link';

import HomeHero from './_components/HomeHero';
import StoreSection from './_components/StoreSection';
import SectionDivider from '@/components/ui/SectionDivider';
import {
  popularStores,
  discountStores,
  recommendedStores,
} from './_mocks/stores.mock';
import { Fragment } from 'react';

export default async function CustomerHomePage() {
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
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col bg-background-default overflow-hidden">
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
      </div>
    </div>
  );
}
