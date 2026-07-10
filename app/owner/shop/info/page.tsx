import ShopHeader from '@/app/owner/shop/_components/ShopHeader';
import ShopSection from '@/app/owner/shop/info/_components/ShopSection';
import OwnerNavbar from '@/components/owner/OwnerNavbar';

export default function StoreInfoPage() {
  return (
    <div className="w-full min-dvh flex flex-col items-start pt-16 pb-24.5">
      <ShopHeader />

      <ShopSection />

      <OwnerNavbar />
    </div>
  );
}
