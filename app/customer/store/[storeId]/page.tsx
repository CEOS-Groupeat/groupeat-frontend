// app/customer/store/[storeId]/page.tsx (또는 CustomerStoreDetailPage)

import StoreDetail from './_components/StoreDetail';
import StoreHeader from './_components/StoreHeader';
import StoreOptions from './_components/StoreOptions';
import FloatingCartBar from './_components/FloatingCartBar';

export default function CustomerStoreDetailPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex flex-col w-full relative pb-30">
      <StoreHeader />

      <div className="relative z-20 -mt-6 w-full bg-white rounded-t-[30px] overflow-hidden">
        <StoreDetail />
      </div>

      <div className="w-full h-2 bg-border-divider" />

      <StoreOptions />

      <FloatingCartBar storeId={params.storeId} />
    </div>
  );
}
