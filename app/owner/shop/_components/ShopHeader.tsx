'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { label: '기본 정보', path: '/owner/shop/info' },
  { label: '메뉴 정보', path: '/owner/shop/menus' },
  { label: '운영 정보', path: '/owner/shop/operations' },
];

const SECTION_TITLE: Record<string, string> = {
  '/owner/shop/info': '가게 정보',
  '/owner/shop/menus': '메뉴 관리',
  '/owner/shop/operations': '영업 설정을 진행해주세요',
};

export default function ShopHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTabPath = tabs.find((tab) =>
    pathname?.startsWith(tab.path)
  )?.path;
  const sectionTitle = activeTabPath ? SECTION_TITLE[activeTabPath] : '';
  const isMenuTab = pathname?.startsWith('/owner/shop/menus');

  return (
    <header className="flex flex-col items-start w-full gap-2 font-['Pretendard']">
      <div className="flex items-center justify-between px-4 w-full">
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-bold text-headline1 text-text-default">
            가게 정보
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 self-stretch">
        <div className="flex h-11 justify-center items-start gap-3 px-4 self-stretch border-b border-border-subtle">
          <div className="w-full flex items-start gap-2.5 self-stretch">
            {tabs.map((tab) => {
              const isActive = pathname?.startsWith(tab.path);

              return (
                <button
                  key={tab.path}
                  type="button"
                  onClick={() => router.push(tab.path)}
                  className={`flex h-[43.25px] pt-1 pr-1.5 pb-1.5 pl-1.5 justify-center items-center gap-1 transition-colors ${
                    isActive
                      ? 'border-b-[1.5px] border-brand-default'
                      : 'border-b-[1.5px] border-transparent hover:border-border-subtle'
                  }`}
                >
                  <p
                    className={`text-label1 transition-colors ${
                      isActive
                        ? 'text-brand-default font-semibold'
                        : 'text-text-subtlest font-normal'
                    }`}
                  >
                    {tab.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-4 flex justify-between items-start self-stretch mt-3">
        <h1 className="text-text-default text-headline3 font-semibold">
          {sectionTitle}
        </h1>

        {isMenuTab && (
          <Link
            href="/owner/shop/menus/add"
            className="flex justify-center items-center w-16.5 h-8 rounded-lg border border-border-default bg-background-default transition-colors hover:bg-background-subtle"
          >
            <p className="text-text-default text-caption1 font-semibold">
              추가하기
            </p>
          </Link>
        )}
      </div>
    </header>
  );
}
