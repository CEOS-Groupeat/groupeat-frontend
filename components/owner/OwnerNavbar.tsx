'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import HomeOn from '@/public/icons/icon_home_on.svg';
import HomeOff from '@/public/icons/icon_cart_off.svg';
import OrderManageOn from '@/public/icons/icon_home_on.svg';
import OrderManageOff from '@/public/icons/icon_cart_off.svg';
import StoreInfoOn from '@/public/icons/icon_home_on.svg';
import StoreInfoOff from '@/public/icons/icon_cart_off.svg';
import ReviewManageOn from '@/public/icons/icon_home_on.svg';
import ReviewManageOff from '@/public/icons/icon_cart_off.svg';
import MyPageOn from '@/public/icons/icon_home_on.svg';
import MyPageOff from '@/public/icons/icon_cart_off.svg';

const navigationItems = [
  { label: '홈', href: '/owner/home', iconOn: HomeOn, iconOff: HomeOff },
  {
    label: '주문 관리',
    href: '/owner/orders',
    iconOn: OrderManageOn,
    iconOff: OrderManageOff,
  },
  {
    label: '가게 정보',
    href: '/owner/shop',
    iconOn: StoreInfoOn,
    iconOff: StoreInfoOff,
  },
  {
    label: '리뷰 관리',
    href: '/owner/review',
    iconOn: ReviewManageOn,
    iconOff: ReviewManageOff,
  },
  {
    label: '계정',
    href: '/owner/settings',
    iconOn: MyPageOn,
    iconOff: MyPageOff,
  },
];

const NavigationMenu = ({
  label,
  href,
  iconOn: IconOn,
  iconOff: IconOff,
  active,
}: {
  label: string;
  href: string;
  iconOn: React.FC<React.SVGProps<SVGSVGElement>>;
  iconOff: React.FC<React.SVGProps<SVGSVGElement>>;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex flex-col justify-center items-center gap-2 flex-1 h-16 transition-all ${
        active ? '' : 'pt-4'
      }`}
    >
      <div className="flex items-center justify-center w-5 h-5 shrink-0">
        {active ? <IconOn className="w-full h-full" /> : <IconOff className="w-full h-full" />}
      </div>

      <p
        className={`whitespace-nowrap text-caption2 font-medium transition-colors ${
          active ? 'text-brand-default' : 'text-background-dim'
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default function OwnerNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full flex px-5 pb-4 justify-between items-start bg-background-default shadow-[0px_-3px_12px_0px_rgba(165,179,198,0.10)]">
      <div className="flex items-start justify-between flex-1 w-full">
        {navigationItems.map((item) => (
          <NavigationMenu
            key={item.href}
            {...item}
            active={pathname?.startsWith(item.href) ?? false}
          />
        ))}
      </div>
    </div>
  );
}