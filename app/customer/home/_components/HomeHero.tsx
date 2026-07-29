'use client';

import Link from 'next/link';
import Logo from '@/public/icons/icon-logo_customer_home.svg';
import CartIconButton from '@/components/cart/CartIconButton';
import CustomerAlertIconButton from '@/components/alert/CustomerAlertIconButton';

export default function HomeHero() {
  return (
    <div className="w-full px-4 pt-10 bg-brand-default">
      <div className="py-4 mt-[6px]">
        <div className="h-[26px] pb-1 flex items-center justify-between">
          <div className="flex items-center gap-[5.27px]">
            <Logo />
            <span className="text-static-white text-xl font-medium font-poppins leading-7">
              Groupeat
            </span>
          </div>

          <div className="flex items-center gap-3 text-icon-inverse">
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
    </div>
  );
}
