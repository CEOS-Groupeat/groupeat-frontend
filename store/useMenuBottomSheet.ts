import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { Menu } from '@/types/store'; // 이전 턴에 만든 타입

export const useMenuBottomSheet = (storeId: string, menu: Menu, onClose: () => void) => {
  // 1. 수량 상태
  const [quantity, setQuantity] = useState(1);

  // 2. 선택된 옵션 상태 
  // (key: 옵션 그룹 ID, value: 선택된 옵션 ID들의 배열)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number[]>>({});

  // 옵션 선택 핸들러 (isMultiple 여부에 따라 다르게 동작)
  const toggleOption = (groupId: number, optionId: number, isMultiple: boolean) => {
    setSelectedOptions((prev) => {
      const currentGroupOptions = prev[groupId] || [];

      if (isMultiple) {
        // 다중 선택: 이미 있으면 빼고, 없으면 넣기
        if (currentGroupOptions.includes(optionId)) {
          return { ...prev, [groupId]: currentGroupOptions.filter(id => id !== optionId) };
        }
        return { ...prev, [groupId]: [...currentGroupOptions, optionId] };
      } else {
        // 단일 선택: 무조건 덮어쓰기
        return { ...prev, [groupId]: [optionId] };
      }
    });
  };

  // 3. 필수 옵션 검증 로직
  const validateOptions = () => {
    const requiredGroups = menu.optionGroups.filter(group => group.isRequired);
    for (const group of requiredGroups) {
      const selectedInGroup = selectedOptions[group.optionGroupId];
      if (!selectedInGroup || selectedInGroup.length === 0) {
        alert(`'${group.name}' 옵션을 선택해주세요.`);
        return false;
      }
    }
    return true;
  };

  // 4. 장바구니 담기 API Mutation
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      // Record 객체를 백엔드 스펙인 [1, 2, 3] 형태의 flat 배열로 변환
      const flatOptionIds = Object.values(selectedOptions).flat();

      return fetchClient('/api/carts/items', {
        method: 'POST',
        body: JSON.stringify({
          storeId: Number(storeId),
          menuId: menu.menuId,
          quantity,
          optionIds: flatOptionIds,
        }),
      });
    },
    onSuccess: () => {
      alert('장바구니에 담겼습니다.');
      onClose();
    },
    onError: () => {
      alert('장바구니 담기에 실패했습니다.');
    }
  });

  const handleAddToCart = () => {
    if (validateOptions()) {
      addToCartMutation.mutate();
    }
  };

  return {
    quantity,
    setQuantity,
    selectedOptions,
    toggleOption,
    handleAddToCart,
    isPending: addToCartMutation.isPending
  };
};