import OrderCard from '@/app/owner/orders/_components/OrderDetailCard';
import type { OwnerOrder } from '@/src/types/api';

interface OrderListProps {
  orders: OwnerOrder[];
  onReject?: (orderId: number) => void;
  onApprove?: (orderId: number) => void;
  onPickupComplete?: (orderId: number) => void;
}

export default function OrderList({
  orders,
  onReject,
  onApprove,
  onPickupComplete,
}: OrderListProps) {
  return (
    <div className="px-4 flex flex-col gap-3 pb-[92px]">
      {orders.map((order) => (
        <OrderCard
          key={order.orderId}
          orderId={order.orderId!}
          orderStatus={order.orderStatus!}
          isReorder={order.isReorder ?? false}
          groupName={order.groupName ?? ''}
          customerName={order.customerName ?? ''}
          pickupDate={order.pickupDate ?? ''}
          pickupTime={order.pickupTime ?? ''}
          totalAmount={order.totalAmount ?? 0}
          paymentMethod={order.paymentMethod ?? null}
          remainingHours={order.remainingHours ?? null}
          items={(order.items ?? []).map((item) => ({
            menuName: item.menuName ?? '',
            quantity: item.quantity ?? 0,
          }))}
          onReject={onReject ? () => onReject(order.orderId!) : undefined}
          onApprove={onApprove ? () => onApprove(order.orderId!) : undefined}
          onPickupComplete={
            onPickupComplete
              ? () => onPickupComplete(order.orderId!)
              : undefined
          }
        />
      ))}
    </div>
  );
}
