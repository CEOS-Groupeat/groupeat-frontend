import ShopHeader from '@/app/owner/shop/_components/ShopHeader';
import ShopSection from '@/app/owner/shop/info/_components/ShopSection';
import OwnerNavbar from '@/components/owner/OwnerNavbar';

export default function StoreInfoPage() {
  return (
    <div className="w-full min-dvh flex flex-col bg-background-default items-start pt-16 pb-[74px]">
      <ShopHeader />

      <ShopSection />

      <OwnerNavbar />
    </div>
  );
}
