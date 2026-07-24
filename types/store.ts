// types/store.ts

// (이전에 정의한 공통 응답 포맷)
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

export interface StoreDetail {
  storeId: number;
  imageUrl: string;
  storeName: string;
  address: string;
  reviewRating: number;
  reviewCount: number;
  phoneNumber: string;
  description: string;
  closedDays: string | null; // 휴무일이 없는 경우 null이 올 수 있으므로 유니온 타입 지정
  pickupOpenTime: string;
  pickupCloseTime: string;
  minOrderDays: number;
  discountConditionQuantity: number;
  discountRate: number;
  minOrderQuantity?: number | undefined;
  maxOrderQuantity?: number | undefined;
  scheduleStartDate?: string | undefined;
  scheduleEndDate?: string | undefined;
  category?: string;
}

export interface PickupTimeInfo {
  date: string;
  dailyAvailableQuantity: number;
  dailyMinOrderQuantity: number;
  dailyAcceptedQuantity?: number;
  dailyRemainingQuantity?: number;
  openTime: string;
  closeTime: string;
  intervalMinutes: number;
}

export interface MenuOption {
  optionId: number;
  name: string;
  additionalPrice: number;
}

export interface MenuOptionGroup {
  optionGroupId: number;
  name: string;
  isRequired: boolean;
  isMultiple: boolean;
  options: MenuOption[];
}

export interface Menu {
  menuId: number;
  name: string;
  basePrice: number;
  description: string;
  imageUrl: string;
  optionGroups: MenuOptionGroup[];
}

export interface MenusResponse {
  menus: Menu[];
}
