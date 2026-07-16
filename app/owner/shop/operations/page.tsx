import ShopHeader from '@/app/owner/shop/_components/ShopHeader';
import OperationSection from './_components/OperationSection';
import OwnerNavbar from '@/components/owner/OwnerNavbar';

export default function StoreOperationsPage() {
  return (
    <div className="w-full min-dvh flex flex-col items-start pt-16 pb-[110px]">
      <ShopHeader />
      <OperationSection />
      <OwnerNavbar />
    </div>
  );
}
