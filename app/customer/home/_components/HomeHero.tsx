'use client';

import BrandIcon from '@/public/icons/icon-brand_customer_home.svg';
import CartIconButton from '@/components/cart/CartIconButton';
import CustomerAlertIconButton from '@/components/alert/CustomerAlertIconButton';
import BrandLogo from '@/public/icons/icon-logo(96_24)_customer_home.svg';

export default function HomeHero() {
  return (
    <div className="w-full pt-[46px] bg-brand-default">
      <div className="px-4 h-[58px] flex items-center justify-between">
        <div className="flex items-center gap-[3px] pb-1">
          <div className="pl-0.5 pt-[5px] pb-[4.33px] pr-[1.47px]">
            <BrandIcon />
          </div>
          <BrandLogo className="self-end" />
        </div>

        <div className="flex items-center gap-3 pt-0.5">
          <CustomerAlertIconButton
            badgeColor="bg-icon-inverse"
            badgeTextColor="text-brand-default"
          />
          <CartIconButton
            badgeColor="bg-icon-inverse"
            badgeTextColor="text-brand-default"
          />
        </div>
      </div>
    </div>
  );
}
