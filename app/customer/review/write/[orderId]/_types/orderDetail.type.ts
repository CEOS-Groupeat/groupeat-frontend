export interface OrderMenuOption {
  optionName: string;
}

export interface OrderMenu {
  menuName: string;
  options: OrderMenuOption[];
  quantity: number;
  menuImageUrl: string;
  discountRate: number;
  totalAmount: number;
}

export interface OrdererInfo {
  customerName: string;
  groupName: string;
  phoneNumber: string;
  orderDate: string;
  orderTime: string;
  requests: string;
}

export interface PaymentInfo {
  paymentMethod: 'PREPAID' | 'ON_SITE';
  paymentMeans: string;
  perPersonAmount: number;
  discountRate: number;
  totalDiscountAmount: number;
  originalTotalAmount: number;
  finalPaymentAmount: number;
}

export interface OrderDetail {
  storeName: string;
  pickupDate: string;
  pickupTime: string;
  ordererInfo: OrdererInfo;
  orderMenus: OrderMenu[];
  paymentInfo: PaymentInfo;
  orderStatus: string; 
}
