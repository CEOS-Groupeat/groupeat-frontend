'use client';

import { useState } from 'react';
import { Menu } from '@/types/store';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import UpArrow from '@/public/icons/icon_arrow_up.svg';
import Ellipse from '@/public/icons/icon_ellipse.svg';

interface MenuBottomSheetProps {
  storeId: string;
  menu: Menu;
  onClose: () => void;
}

interface MenuCard {
  id: string;
  selectedOptions: Record<number, number[]>;
  quantity: number;
}

export default function MenuBottomSheet({
  menu,
  onClose,
}: MenuBottomSheetProps) {
  // --- 1. 전체 화면 상태 관리 ---
  const [cards, setCards] = useState<MenuCard[]>([]);
  const [mode, setMode] = useState<'CREATE' | 'LIST' | 'EDIT'>('CREATE');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // --- 2. 폼(옵션 선택) 상태 관리 ---
  const [quantity, setQuantity] = useState<number | ''>('');
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number[]>
  >({});
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);

  // --- 3. 상태 변경 핸들러 ---
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
    const group = menu.optionGroups.find((g) => g.optionGroupId === groupId);
    if (!group) return null;
    return selectedIds
      .map((id) => {
        const opt = group.options.find((o) => o.optionId === id);
        return opt
          ? `${opt.name} (+${opt.additionalPrice.toLocaleString()}원)`
          : '';
      })
      .join(', ');
  };

  const isFormValid = () => {
    const requiredGroups = menu.optionGroups.filter(
      (group) => group.isRequired
    );
    const hasAllRequired = requiredGroups.every(
      (group) => selectedOptions[group.optionGroupId]?.length > 0
    );
    return hasAllRequired && typeof quantity === 'number' && quantity > 0;
  };

  // [액션] 새 상품 추가 누를 때 폼 초기화
  const handleAddNewItem = () => {
    setQuantity('');
    setSelectedOptions({});
    setExpandedGroupId(null);
    setMode('CREATE');
  };

  // [액션] 기존 카드 수정 누를 때 폼에 데이터 채우기
  const handleEditCard = (card: MenuCard) => {
    setQuantity(card.quantity);
    setSelectedOptions(card.selectedOptions);
    setExpandedGroupId(null);
    setEditingCardId(card.id);
    setMode('EDIT');
  };

  // [액션] 메뉴 담기(CREATE) 또는 수정 완료(EDIT) 버튼 누를 때
  const handleSaveForm = () => {
    if (!isFormValid()) return;

    if (mode === 'CREATE') {
      const newCard: MenuCard = {
        id: Date.now().toString(), // 임시 고유 ID
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
    // 저장 후 무조건 LIST 모드로 이동
    setMode('LIST');
  };

  // 옵션 선택 화면
  const renderOptionForm = () => {
    return (
      <>
        {/* 헤더 */}
        {/* FIX: 내용물이 길어져도 헤더가 찌그러지지 않도록 shrink-0 추가 */}
        <div className="flex justify-center items-center py-4.5 border-b border-border-subtle shadow-[0_0_9px_0_rgba(0,0,0,0.04)] relative shrink-0">
          <h2 className="text-text-default text-headline3 font-semibold">
            {mode === 'EDIT' ? '옵션 수정' : menu.name}
          </h2>
          {cards.length > 0 && (
            <button
              className="absolute right-4 text-text-subtlest"
              onClick={() => setMode('LIST')}
            >
              닫기
            </button>
          )}
        </div>

        {/* 아코디언 옵션 리스트 */}
        {/* FIX: 내부 스크롤이 정상 작동하도록 flex-1 min-h-0 추가 */}
        <div className="flex flex-col gap-3 px-4 pt-4.5 overflow-y-auto flex-1 min-h-0">
          {menu.optionGroups.map((group) => {
            const isExpanded = expandedGroupId === group.optionGroupId;
            const selectedText = getSelectedOptionText(group.optionGroupId);

            return (
              <div
                key={group.optionGroupId}
                className="flex flex-col border border-border-strong rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full px-4 py-3 bg-white"
                  onClick={() =>
                    setExpandedGroupId(isExpanded ? null : group.optionGroupId)
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
                        <Ellipse className="text-text-subtlest" />
                        <p className="text-text-subtlest text-label1">
                          {selectedText}
                        </p>
                      </div>
                    )}
                  </div>
                  {isExpanded ? (
                    <UpArrow className="w-5 h-5 text-icon-default" />
                  ) : (
                    <DownArrow className="w-5 h-5 text-icon-default" />
                  )}
                </button>

                {isExpanded && (
                  <div className="w-full flex flex-col items-start justify-between border-t border-border-strong">
                    {group.options.map((option) => {
                      return (
                        <div
                          key={option.optionId}
                          onClick={() =>
                            toggleOption(
                              group.optionGroupId,
                              option.optionId,
                              group.isMultiple
                            )
                          }
                          className="w-full flex justify-between items-center px-4 py-3 cursor-pointer transition-colors bg-white text-text-default"
                        >
                          <span className="text-label1">{option.name}</span>
                          <span className="text-label1">
                            +{option.additionalPrice.toLocaleString()}원
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 수량 입력 */}
        {/* FIX: 수량 입력창이 압축되지 않도록 shrink-0 추가 */}
        <div className="flex flex-col gap-2 px-4 mt-3 shrink-0">
          <input
            type="number"
            min="1"
            placeholder="수량을 입력하세요"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === '' ? '' : Number(e.target.value))
            }
            className="w-full h-11 px-4 py-3 rounded-lg border border-border-default text-body placeholder:text-text-placeholder focus:outline-none focus:border-brand-default"
          />
        </div>

        {/* 폼 저장 버튼 */}
        {/* FIX: 버튼 영역이 압축되지 않도록 shrink-0 추가 */}
        <div className="flex items-center justify-center px-4 pb-6 mt-6 shrink-0">
          <button
            onClick={handleSaveForm}
            disabled={!isFormValid()}
            className={`w-full h-12 rounded-lg font-bold transition-colors ${
              isFormValid()
                ? 'bg-brand-default text-white'
                : 'bg-background-subtlest text-text-subtlest'
            }`}
          >
            {mode === 'EDIT' ? '수정 완료' : '메뉴 담기'}
          </button>
        </div>
      </>
    );
  };

  // 카드 목록 화면
  const renderCardList = () => {
    return (
      // FIX: h-full을 대체하여 플렉스 영역을 꽉 채우고 스크롤 한계선을 만들어주는 flex-1 min-h-0 적용
      <div className="flex flex-col flex-1 min-h-0">
        {/* 헤더 */}
        {/* FIX: 헤더 찌그러짐 방지 shrink-0 */}
        <div className="flex justify-center items-center py-4.5 border-b border-border-subtle relative shrink-0">
          <h2 className="text-text-default text-headline3 font-semibold">
            {menu.name}
          </h2>
        </div>

        {/* 이 부분의 flex-1 overflow-y-auto가 부모의 min-h-0 덕분에 정상 작동하게 됩니다 */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 flex flex-col gap-4">
          {/* 생성된 카드 렌더링 */}
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-border-default rounded-lg px-4 py-3 cursor-pointer"
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
                    if (cards.length === 1) setMode('CREATE');
                  }}
                >
                  x
                </button>
              </div>
              <div className="flex flex-col items-start justify-center w-full my-1.5 text-label1 text-text-subtle">
                <p>가격: 8,600원</p>
                <p>샌드위치 선택: 통새우 (+800원)</p>
                <p>김밥 선택 : 참치 (+0)원</p>
                <p>수량: {card.quantity}개</p>
              </div>
              <div className="flex items-center">
                <p className="text-body text-text-default font-semibold">
                  392,000
                </p>
              </div>
            </div>
          ))}

          {/* 2. 상품 추가 버튼 */}
          <button
            className="w-full h-12 border border-border-strong rounded-lg flex items-center justify-center font-medium text-text-subtle shrink-0"
            onClick={handleAddNewItem}
          >
            + 상품 추가
          </button>

          {/* 3. 최종 장바구니 담기 버튼 */}
          <button
            className="w-full h-12 bg-brand-default text-white rounded-lg font-bold shrink-0"
            onClick={() => {
              // TODO: 여기서 백엔드로 API 전송
              alert('총 ' + cards.length + '개의 카드를 장바구니에 담습니다!');
            }}
          >
            메뉴 담기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background-dim/40">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full bg-background-default rounded-t-[35px] flex flex-col max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-full duration-200">
        {mode === 'LIST' ? renderCardList() : renderOptionForm()}
      </div>
    </div>
  );
}
