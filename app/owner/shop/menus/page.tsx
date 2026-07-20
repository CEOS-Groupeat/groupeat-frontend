'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MenuSection from '@/app/owner/shop/_components/MenuSection';
import ShopHeader from '@/app/owner/shop/_components/ShopHeader';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import SuccessToast from '@/components/ui/SuccessToast';

function MenuSavedToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(
    () => searchParams.get('toast') === 'saved'
  );

  useEffect(() => {
    if (showToast) {
      router.replace('/owner/shop/menus');
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, router]);

  if (!showToast) return null;
  return <SuccessToast text="저장되었습니다." bottom={102} />;
}

export default function StoreMenusPage() {
  return (
    <div className="w-full min-dvh flex flex-col bg-background-default items-start pt-16 pb-24.5">
      <ShopHeader />

      <MenuSection />

      <OwnerNavbar />

      <Suspense fallback={null}>
        <MenuSavedToast />
      </Suspense>
    </div>
  );
}
