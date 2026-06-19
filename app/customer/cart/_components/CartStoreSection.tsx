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
  const hasSelected = (storeCart.cartItems ?? [])
    .filter((item) => item.cartItemId !== undefined)
    .some((item) => selectedIds.includes(item.cartItemId!));

  const handleSelectAll = () => {
    const ids = (storeCart.cartItems ?? [])
      .filter((item) => item.cartItemId !== undefined)
      .map((item) => item.cartItemId!);
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
            isSelected={
              item.cartItemId !== undefined &&
              selectedIds.includes(item.cartItemId!)
            }
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
