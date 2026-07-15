'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponse, StoreDetail as StoreDetailType } from '@/types/store';
import { useState } from 'react';
import { fetchClient } from '@/lib/fetchClient';
import { Menu } from '@/src/types/api';
import ToastError from '@/components/ui/ToastError';
import ButtonDefault from '@/components/ui/ButtonDefault';
import InputField from '@/components/ui/InputField';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import UpArrow from '@/public/icons/icon_arrow_up.svg';
import Ellipse from '@/public/icons/icon_ellipse.svg';
import CloseIcon from '@/public/icons/icon_close.svg';

interface MenuBottomSheetProps {
  storeId: string;
  menu: Menu;
  pickupDate?: string;
  pickupTime?: string;
  onClose: () => void;
}

interface MenuCard {
  id: string;
  selectedOptions: Record<number, number[]>;
  quantity: number;
}

export default function MenuBottomSheet({
  storeId,
  menu,
  pickupDate,
  pickupTime,
  onClose,
}: MenuBottomSheetProps) {
  const queryClient = useQueryClient();

  const { data: storeDetail } = useQuery<StoreDetailType>({
    queryKey: ['storeDetail', storeId],
    queryFn: async () => {
      const response = await fetchClient(`/api/stores/${storeId}`);
      const result = response as unknown as ApiResponse<StoreDetailType>;
      if (!result.isSuccess) throw new Error(result.message);
      return result.data;
    },
    enabled: !!storeId,
  });

  const discountRate = storeDetail?.discountRate || 0;
  const discountCondition = storeDetail?.discountConditionQuantity || 0;

  const [cards, setCards] = useState<MenuCard[]>([]);
  const [mode, setMode] = useState<'CREATE' | 'LIST' | 'EDIT'>('CREATE');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const [quantity, setQuantity] = useState<number | ''>('');
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number[]>
  >({});
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleOption = (
    groupId: number,
    optionId: number,
    isMultiple: boolean
  ) => {
    setSelectedOptions((prev) => {
      const currentGroupOptions = prev[groupId] || [];
      if (isMultiple) {
        if (currentGroupOptions.includes(optionId)) {
          return {
            ...prev,
            [groupId]: currentGroupOptions.filter((id) => id !== optionId),
          };
        }
        return { ...prev, [groupId]: [...currentGroupOptions, optionId] };
      } else {
        return { ...prev, [groupId]: [optionId] };
      }
    });
    if (!isMultiple) setExpandedGroupId(null);
  };

  const getSelectedOptionText = (groupId: number) => {
    const selectedIds = selectedOptions[groupId];
    if (!selectedIds || selectedIds.length === 0) return null;
    const group = menu.optionGroups?.find((g) => g.optionGroupId === groupId);
    if (!group) return null;
    return selectedIds
      .map((id) => {
        const opt = group.options?.find((o) => o.optionId === id);
        return opt
          ? `${opt.name} (+${opt.additionalPrice?.toLocaleString()}원)`
          : '';
      })
      .join(', ');
  };

  const isFormValid = () => {
    const requiredGroups =
      menu.optionGroups?.filter((group) => group.isRequired) || [];
    const hasAllRequired = requiredGroups.every(
      (group) => (selectedOptions[group.optionGroupId!] ?? []).length > 0
    );
    return hasAllRequired && typeof quantity === 'number' && quantity > 0;
  };

  const handleAddNewItem = () => {
    setQuantity('');
    setSelectedOptions({});
    setExpandedGroupId(null);
    setMode('CREATE');
  };

  const handleEditCard = (card: MenuCard) => {
    setQuantity(card.quantity);
    setSelectedOptions(card.selectedOptions);
    setExpandedGroupId(null);
    setEditingCardId(card.id);
    setMode('EDIT');
  };

  const handleSaveForm = () => {
    if (!isFormValid()) return;

    if (mode === 'CREATE') {
      const newCard: MenuCard = {
        id: Date.now().toString(),
        selectedOptions,
        quantity: Number(quantity),
      };
      setCards((prev) => [...prev, newCard]);
    } else if (mode === 'EDIT' && editingCardId) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === editingCardId
            ? { ...card, selectedOptions, quantity: Number(quantity) }
            : card
        )
      );
      setEditingCardId(null);
    }
    setMode('LIST');
  };

  const addCartMutation = useMutation({
    mutationFn: async (cardsToSubmit: MenuCard[]) => {
      const cartItemsPayload = cardsToSubmit.map((card) => ({
        storeId: Number(storeId),
        menuId: menu.menuId,
        quantity: card.quantity,
        optionIds: Object.values(card.selectedOptions).flat(),
        pickupDate,
        pickupTime,
      }));

      return fetchClient('/api/carts/items', {
        method: 'POST',
        body: JSON.stringify({ cartItems: cartItemsPayload }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      onClose();
    },
    onError: (error: Error) => {
      setErrorMessage(error.message || '장바구니 담기에 실패했습니다.');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    },
  });

  const handleSubmitCart = () => {
    if (!pickupDate || !pickupTime) {
      setErrorMessage('픽업 날짜를 먼저 선택해주세요.');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    if (cards.length === 0) return;
    addCartMutation.mutate(cards);
  };

  const renderOptionForm = () => {
    return (
      <>
        <div className="flex justify-center items-center py-4.5 border-b border-border-subtle shadow-[0_0_9px_0_rgba(0,0,0,0.04)] shrink-0 z-modal bg-background-default">
          <h2 className="text-text-default text-headline3 font-semibold">
            {mode === 'EDIT' ? '옵션 수정' : menu.name}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4.5 pb-4 flex flex-col gap-3 min-h-0 bg-background-default">
          {menu.optionGroups?.map((group) => {
            const isExpanded = expandedGroupId === group.optionGroupId;
            const selectedText = getSelectedOptionText(group.optionGroupId!);

            return (
              <div
                key={group.optionGroupId!}
                className="flex flex-col border border-border-strong rounded-lg overflow-hidden shrink-0"
              >
                <button
                  className="flex justify-between items-center w-full h-11 pl-4 pr-3 py-3 bg-white"
                  onClick={() =>
                    setExpandedGroupId(isExpanded ? null : group.optionGroupId!)
                  }
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-body font-semibold ${
                        selectedText
                          ? 'text-text-default'
                          : 'text-text-placeholder'
                      }`}
                    >
                      {group.name}
                    </span>
                    {selectedText && !isExpanded && (
                      <div className="flex h-full items-center justify-center gap-2">
                        <Ellipse className="text-text-subtlest w-0.5 h-0.5 shrink-0" />
                        <p className="text-text-subtlest text-label1">
                          {selectedText}
                        </p>
                      </div>
                    )}
                  </div>
                  {isExpanded ? (
                    <UpArrow className="w-5 h-5 text-icon-default shrink-0" />
                  ) : (
                    <DownArrow className="w-5 h-5 text-icon-default shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="w-full flex flex-col items-start justify-between border-t border-border-strong">
                    {group.options?.map((option) => {
                      return (
                        <div
                          key={option.optionId!}
                          onClick={() =>
                            toggleOption(
                              group.optionGroupId!,
                              option.optionId!,
                              group.isMultiple || false
                            )
                          }
                          className="w-full h-11 flex justify-between items-center pl-4 pr-3 py-3 cursor-pointer transition-colors bg-white text-text-default"
                        >
                          <span className="text-label1">{option.name}</span>
                          <span className="text-label1">
                            +{(option.additionalPrice || 0).toLocaleString()}원
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-col items-start w-full gap-2 shrink-0">
            <InputField
              type="number"
              placeholder="수량을 입력하세요"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(e.target.value === '' ? '' : Number(e.target.value))
              }
            />
            {discountRate > 0 && discountCondition > 0 && (
              <p className="text-brand-default text-caption2 font-medium animate-in fade-in">
                {discountCondition}개 이상 주문 시 {discountRate}% 할인
              </p>
            )}
          </div>
        </div>

        {/* 하단 버튼 영역 (높이 고정, 스크롤 안 됨) */}
        <div className="flex items-center justify-center px-4 pb-6 pt-2 shrink-0 bg-background-default border-t border-border-subtle">
          <ButtonDefault onClick={handleSaveForm} disabled={!isFormValid()}>
            {mode === 'EDIT' ? '옵션 수정하기' : '메뉴 담기'}
          </ButtonDefault>
        </div>
      </>
    );
  };

  const renderCardList = () => {
    return (
      <>
        {/* 상단 헤더 */}
        <div className="flex justify-center items-center py-4.5 border-b border-border-subtle shrink-0 bg-background-default">
          <h2 className="text-text-default text-headline3 font-semibold">
            {menu.name}
          </h2>
        </div>

        {/* 카드가 많아지면 스크롤 되는 영역 */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 flex flex-col gap-4 min-h-0 bg-background-default">
          {cards.map((card) => {
            let optionsPrice = 0;
            const optionTexts: string[] = [];

            Object.entries(card.selectedOptions).forEach(
              ([groupIdStr, optionIds]) => {
                const groupId = Number(groupIdStr);
                const group = menu.optionGroups?.find(
                  (g) => g.optionGroupId === groupId
                );
                if (!group) return;

                optionIds.forEach((optId) => {
                  const option = group.options?.find(
                    (o) => o.optionId === optId
                  );
                  if (option) {
                    optionsPrice += option.additionalPrice || 0;
                    optionTexts.push(
                      `${group.name}: ${option.name} (+${(option.additionalPrice || 0).toLocaleString()}원)`
                    );
                  }
                });
              }
            );

            const unitPrice = (menu.basePrice || 0) + optionsPrice;
            const totalPrice = unitPrice * card.quantity;

            return (
              <div
                key={card.id}
                className="border border-border-default rounded-lg px-4 py-3 cursor-pointer shrink-0"
                onClick={() => handleEditCard(card)}
              >
                <div className="flex justify-between items-start">
                  <p className="text-body font-medium text-text-default">
                    옵션 요약
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCards((prev) => prev.filter((c) => c.id !== card.id));
                    }}
                  >
                    <CloseIcon className="w-5 h-5 text-icon-subtlest" />
                  </button>
                </div>
                <div className="flex flex-col items-start justify-center w-full my-1.5 text-label1 text-text-subtle gap-0.5">
                  {optionTexts.length > 0 ? (
                    optionTexts.map((text, idx) => <p key={idx}>{text}</p>)
                  ) : (
                    <p>선택된 추가 옵션 없음</p>
                  )}
                  <p className="mt-1">
                    개당 가격: {unitPrice.toLocaleString()}원
                  </p>
                  <p>수량: {card.quantity}개</p>
                </div>
                <div className="flex items-center justify-start w-full mt-2">
                  <p className="text-body text-text-default font-semibold">
                    {totalPrice.toLocaleString()}원
                  </p>
                </div>
              </div>
            );
          })}

          <button
            className="w-full h-12 border border-border-strong rounded-lg flex items-center justify-center font-medium text-text-default bg-white shrink-0"
            onClick={handleAddNewItem}
          >
            + 상품 추가
          </button>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="px-4 pb-6 pt-2 shrink-0 bg-background-default border-t border-border-subtle">
          <ButtonDefault
            onClick={handleSubmitCart}
            disabled={addCartMutation.isPending || cards.length === 0}
          >
            {addCartMutation.isPending ? '담는 중...' : '메뉴 담기'}
          </ButtonDefault>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-modal flex items-end justify-center bg-background-dim/40">
      {showError && <ToastError text={errorMessage} />}

      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full h-109 bg-background-default rounded-t-[35px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-200">
        {mode === 'LIST' ? renderCardList() : renderOptionForm()}
      </div>
    </div>
  );
}
