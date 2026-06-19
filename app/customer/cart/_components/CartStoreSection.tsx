'use client';

import CartStoreHeader from './CartStoreHeader';
import CartListItem from './CartListItem';
import type { StoreCart } from '@/src/types/api';

interface CartStoreSectionProps {
  storeCart: StoreCart;
  selectedIds: number[];
  onSelect: (cartItemId: number) => void;
  onSelectAll: (cartItemIds: number[]) => void;
  onDelete: (cartItemId: number) => void;
}

export default function CartStoreSection({
  storeCart,
  selectedIds,
  onSelect,
  onSelectAll,
  onDelete,
}: CartStoreSectionProps) {
  const hasSelected = (storeCart.cartItems ?? []).some((item) =>
    selectedIds.includes(item.cartItemId ?? 0)
  );

  const handleSelectAll = () => {
    const ids = (storeCart.cartItems ?? []).map((item) => item.cartItemId ?? 0);
    onSelectAll(ids);
  };

  return (
    <div className="flex flex-col px-4">
      <CartStoreHeader
        storeId={storeCart.storeId ?? 0}
        storeName={storeCart.storeName ?? ''}
        hasSelected={hasSelected}
        onSelectAll={handleSelectAll}
      />

      <div className="flex flex-col">
        {(storeCart.cartItems ?? []).map((item) => (
          <CartListItem
            key={item.cartItemId}
            item={item}
            isSelected={selectedIds.includes(item.cartItemId ?? 0)}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
