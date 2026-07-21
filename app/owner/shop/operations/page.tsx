'use client';

import ShopHeader from '@/app/owner/shop/_components/ShopHeader';
import OperationSection from './_components/OperationSection';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import { useTimeDropdownStore } from '@/store/useTimeDropdownStore';

export default function StoreOperationsPage() {
  const isDropdownOpen = useTimeDropdownStore((state) => state.isOpen);

  return (
    <div
      className={`w-full min-h-screen bg-background-default flex flex-col items-start pt-16 transition-all duration-200 ${
        isDropdownOpen ? 'pb-[300px]' : 'pb-[110px]'
      }`}
    >
      <ShopHeader />
      <OperationSection />
      <OwnerNavbar />
    </div>
  );
}
