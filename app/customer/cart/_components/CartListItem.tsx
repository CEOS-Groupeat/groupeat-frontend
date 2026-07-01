'use client';

import Image from 'next/image';
import CloseIcon from '@/public/icons/icon_close.svg';
import CheckboxFalseIcon from '@/public/icons/icon_checkboxFalse.svg';
import CheckboxTrueIcon from '@/public/icons/icon_checkboxTrue.svg';
import type { CartItem } from '@/src/types/api';
// 💡 parseMenuSummary 임포트 삭제 (더 이상 필요 없음)

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
  const menuTitle = item.menuName ?? '메뉴';
  const options = item.optionNames ?? [];

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-1">
          <button
            type="button"
            onClick={() =>
              item.cartItemId !== undefined && onSelect(item.cartItemId)
            }
            className="size-6 flex items-center justify-center shrink-0"
            disabled={item.cartItemId === undefined}
            aria-label={`${menuTitle} 선택`}
          >
            {isSelected ? (
              <CheckboxTrueIcon className="text-icon-default" />
            ) : (
              <CheckboxFalseIcon className="text-icon-disable" />
            )}
          </button>

          <div className="flex items-start gap-3 font-['Pretendard']">
            <div className="relative size-17.5 rounded-lg overflow-hidden shrink-0">
              <Image
                src={
                  item.imageUrl?.startsWith('/') ||
                  item.imageUrl?.startsWith('http://') ||
                  item.imageUrl?.startsWith('https://')
                    ? item.imageUrl
                    : '/images/image_logo.png'
                }
                alt={menuTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-body font-medium text-text-default">
                {menuTitle}
              </span>
              {/* 💡 수정됨: 백엔드에서 주는 문자열 배열을 그대로 줄바꿈으로 렌더링 */}
              {options.length > 0 && (
                <span className="text-label1 text-text-subtle font-normal whitespace-pre-line">
                  {options.join('\n')}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            item.cartItemId !== undefined && onDelete(item.cartItemId)
          }
          className="shrink-0"
          disabled={item.cartItemId === undefined}
          aria-label={`${menuTitle} 삭제`}
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
            {item.quantity ?? 0}개
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-caption1 font-normal text-text-default">
            1인당 금액
          </span>
          <span className="text-caption1 font-medium text-text-default">
            {(item.unitPrice ?? 0).toLocaleString()}원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-caption1 font-normal text-text-default">
            할인 금액
          </span>
          <span className="text-xs font-semibold text-brand-strong">
            -{(item.discountAmount ?? 0).toLocaleString()}원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="items-center text-label2 font-semibold text-text-default">
            총 금액
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-normal leading-4 text-text-subtlest line-through">
              {((item.unitPrice ?? 0) * (item.quantity ?? 0)).toLocaleString()}
              원
            </span>
            <span className="text-body font-semibold text-text-default">
              {(item.finalPrice ?? 0).toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
