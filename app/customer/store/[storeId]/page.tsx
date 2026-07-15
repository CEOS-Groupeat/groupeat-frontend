// app/customer/store/[storeId]/page.tsx
import StoreDetail from './_components/StoreDetail';
import StoreHeader from './_components/StoreHeader';
import StoreOptions from './_components/StoreOptions';

export default function CustomerStoreDetailPage() {
  return (
    <div className="flex flex-col w-full relative pb-16">
      <StoreHeader />

      <div className="relative z-20 -mt-6 w-full bg-white rounded-t-[30px] overflow-hidden">
        <StoreDetail />
      </div>

      <div className="w-full h-2 bg-border-divider" />

      <StoreOptions />
    </div>
  );
}
