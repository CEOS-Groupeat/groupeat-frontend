'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function ShopHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { label: '기본 정보', path: '/owner/shop/info' },
    { label: '메뉴 정보', path: '/owner/shop/menus' },
    { label: '운영 정보', path: '/owner/shop/operations' },
  ];

  return (
    <header className="flex flex-col items-start w-full gap-2 px-4 mb-5">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-bold text-headline1 text-text-default">
            가게 정보
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 self-stretch">
        <div className="flex h-11 justify-center items-start gap-3 self-stretch border-b border-border-subtle">
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
    </header>
  );
}
