'use client';

import CartStoreHeader from './CartStoreHeader';
import CartListItem from './CartListItem';
import type { StoreCart } from '../_types/cart.type';

interface CartStoreGroupProps {
  storeCart: StoreCart;
  selectedIds: number[];
  onSelect: (cartItemId: number) => void;
  onSelectAll: (cartItemIds: number[]) => void;
  onDelete: (cartItemId: number) => void;
}

export default function CartStoreGroup({
  storeCart,
  selectedIds,
  onSelect,
  onSelectAll,
  onDelete,
}: CartStoreGroupProps) {
  const hasSelected = storeCart.cartItems.some((item) =>
    selectedIds.includes(item.cartItemId)
  );

  const handleSelectAll = () => {
    const ids = storeCart.cartItems.map((item) => item.cartItemId);
    onSelectAll(ids);
  };

  return (
    <div className="flex flex-col px-4">
      <CartStoreHeader
        storeId={storeCart.storeId}
        storeName={storeCart.storeName}
        hasSelected={hasSelected}
        onSelectAll={handleSelectAll}
      />

      <div className="flex flex-col">
        {storeCart.cartItems.map((item) => (
          <CartListItem
            key={item.cartItemId}
            item={item}
            isSelected={selectedIds.includes(item.cartItemId)}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
