'use client';

import Image from 'next/image';
import CloseIcon from '@/public/icons/icon_close.svg';
import CheckboxFalseIcon from '@/public/icons/icon_checkboxFalse.svg';
import CheckboxTrueIcon from '@/public/icons/icon_checkboxTrue.svg';
import type { CartItem } from '../_types/cart.type';

interface CartItemProps {
  item: CartItem;
  isSelected: boolean;
  onSelect: (cartItemId: number) => void;
  onDelete: (cartItemId: number) => void;
}

export default function CartListItem({
  item,
  isSelected,
  onSelect,
  onDelete,
}: CartItemProps) {
  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-1">
          <button
            type="button"
            onClick={() => onSelect(item.cartItemId)}
            className="size-6 flex items-center justify-center shrink-0"
          >
            {isSelected ? (
              <CheckboxTrueIcon className="text-icon-default" />
            ) : (
              <CheckboxFalseIcon className="text-icon-disable" />
            )}
          </button>

          <div className="flex items-start gap-3">
            <div className="relative size-[70px] rounded-lg overflow-hidden shrink-0">
              <Image
                src={
                  item.imageUrl?.startsWith('/') ||
                  item.imageUrl?.startsWith('http://') ||
                  item.imageUrl?.startsWith('https://')
                    ? item.imageUrl
                    : '/images/image_logo.png'
                }
                alt={item.menuSummary}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-body font-medium text-text-default font-['Pretendard']">
              {item.menuSummary}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(item.cartItemId)}
          className="shrink-0"
        >
          <CloseIcon className="size-4 text-icon-default" />
        </button>
      </div>

      <div className="flex flex-col gap-1 w-60 self-end font-['Pretendard']">
        <div className="flex justify-between">
          <span className="text-caption1 font-normal text-text-default">
            수량
          </span>
          <span className="text-caption1 font-medium text-text-default">
            {item.quantity}개
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-caption1 font-normal text-text-default">
            1인당 금액
          </span>
          <span className="text-caption1 font-medium text-text-default">
            {item.unitPrice.toLocaleString()}원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-caption1 font-normal text-text-default">
            할인 금액
          </span>
          <span className="text-xs font-semibold text-brand-strong">
            -{item.discountAmount.toLocaleString()}원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="items-center text-label2 font-semibold text-text-default">
            총 금액
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-normal leading-4 text-text-subtlest line-through">
              {(item.unitPrice * item.quantity).toLocaleString()}원
            </span>
            <span className="text-body font-semibold text-text-default">
              {item.finalPrice.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
