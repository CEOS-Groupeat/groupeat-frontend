'use client';

import OwnerOrdersSummaryHeader from './_components/OwnerOrdersSummaryHeader';
import SalesReportSection from './_components/SalesReportSection';
import OrderSummarySection from './_components/OrderSummarySection';
import ReadyStatusModal from './_components/ReadyStatusModal';

export default function OwnerOrdersSummaryPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-background-default">
      <OwnerOrdersSummaryHeader />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="w-full flex flex-col gap-10">
          <OrderSummarySection />
          <SalesReportSection />
        </div>
      </div>

      <ReadyStatusModal />
    </div>
  );
}
