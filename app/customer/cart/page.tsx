'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useCart } from './_hooks/useCart';
import { useDeleteCartItem } from './_hooks/useDeleteCartItem';
import { useCalculateCart } from './_hooks/useCalculateCart';

import CartHeader from './_components/CartHeader';
import CartStoreSection from './_components/CartStoreSection';
import CartSummaryBar from './_components/CartSummaryBar';
import CartEmptyState from './_components/CartEmptyState';

export default function CartPage() {
  const router = useRouter();

  const { data: cartData, isLoading } = useCart();
  const { mutateAsync: deleteItem } = useDeleteCartItem();
  const { mutate: calculateCart, data: summary } = useCalculateCart();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (selectedIds.length > 0) {
      calculateCart({ cartItemIds: selectedIds });
    }
  }, [selectedIds, calculateCart]);

  const handleSelect = (cartItemId: number) => {
    const targetStoreItems =
      cartData?.storeCarts
        .find((store) =>
          store.cartItems.some((item) => item.cartItemId === cartItemId)
        )
        ?.cartItems.map((item) => item.cartItemId) ?? [];

    setSelectedIds((prev) => {
      if (prev.includes(cartItemId)) {
        return prev.filter((id) => id !== cartItemId);
      }
      return [
        ...prev.filter((id) => targetStoreItems.includes(id)),
        cartItemId,
      ];
    });
  };

  const handleSelectAll = (cartItemIds: number[]) => {
    const allSelected = cartItemIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !cartItemIds.includes(id)));
    } else {
      setSelectedIds(cartItemIds);
    }
  };

  const handleDelete = (cartItemId: number) => {
    deleteItem(cartItemId);
    setSelectedIds((prev) => prev.filter((id) => id !== cartItemId));
  };

  const handleDeleteAll = async () => {
    const allItemIds =
      cartData?.storeCarts
        .flatMap((store) => store.cartItems)
        .map((item) => item.cartItemId) ?? [];

    await Promise.all(allItemIds.map((id) => deleteItem(id)));
    setSelectedIds([]);
  };

  const totalStoreCount = cartData?.storeCarts.length ?? 0;

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col pb-44">
      <CartHeader
        totalStoreCount={totalStoreCount}
        onDeleteAll={handleDeleteAll}
      />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">로딩 중...</span>
        </div>
      ) : !cartData || cartData?.storeCarts.length === 0 ? (
        <CartEmptyState />
      ) : (
        <>
          {cartData?.storeCarts.map((storeCart) => (
            <CartStoreSection
              key={storeCart.storeId}
              storeCart={storeCart}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onDelete={handleDelete}
            />
          ))}

          <CartSummaryBar
            summary={summary ?? null}
            cartData={cartData}
            onOrder={() => router.push('/customer/order/request')}
          />
        </>
      )}
    </div>
  );
}
