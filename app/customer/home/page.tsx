{
  /* 고객 메인 페이지입니다. */
}
import { checkServerHealth } from '@/utils/useStoreFetch';
import Link from 'next/link';

import HomeHero from './_components/HomeHero';
import StoreSection from './_components/StoreSection';
import {
  popularStores,
  discountStores,
  recommendedStores,
} from './_mocks/stores.mock';
import { Fragment } from 'react';

export default async function CustomerHomePage() {
  const serverMessage = await checkServerHealth().catch((error) => {
    console.error('서버 상태 확인 실패:', error);
    return '서버 상태를 확인할 수 없습니다.';
  });

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

  function SectionDivider() {
    return (
      <div className="pt-[19px]">
        <div className="pt-1">
          <div className="w-full h-2 bg-border-strong opacity-30" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col bg-background-default overflow-hidden">
        <HomeHero />

        {sections.map((section, index) => (
          <Fragment key={section.id}>
            {index === 0 ? (
              <div className="pt-5 px-4">
                <StoreSection {...section} />
              </div>
            ) : (
              <>
                <SectionDivider />

                <div className="pt-[19px] px-4">
                  <StoreSection {...section} />
                </div>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
