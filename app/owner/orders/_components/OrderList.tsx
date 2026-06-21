import OrderCard from '@/app/owner/orders/_components/OrderCard';
import { MOCK_ORDERS } from '@/app/owner/orders/_constants/orders.mock';

interface OrderListProps {
  orders: typeof MOCK_ORDERS; // api 타입으로 교체 예정 (임시 타입)
  onReject: (orderId: number) => void;
  onApprove?: (orderId: number) => void;
  onDetailClick?: (orderId: number) => void;
}

export default function OrderList({
  orders,
  onReject,
  onApprove,
  onDetailClick,
}: OrderListProps) {
  return (
    <div className="px-4 flex flex-col gap-3 pb-24">
      {orders.map((order) => (
        <OrderCard
          key={order.orderId}
          {...order}
          onReject={() => onReject(order.orderId)}
          onApprove={onApprove ? () => onApprove(order.orderId) : undefined}
          onDetailClick={
            onDetailClick ? () => onDetailClick(order.orderId) : undefined
          }
        />
      ))}
    </div>
  );
}
