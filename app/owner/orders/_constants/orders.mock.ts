export const MOCK_ORDERS = [
  {
    orderId: 1,
    status: 'pending' as const,
    isReorder: false,
    groupName: 'CEOS 데모데이',
    customerName: '안세빈',
    pickupDate: '6월 15일(월) 오전 10:00',
    paymentAmount: 325000,
    paymentMethod: 'PREPAID' as const,
    items: [
      { menuName: '반반 세트', quantity: 55 },
      { menuName: '특별 세트', quantity: 15 },
    ],
    orderDate: '2026-06-15T10:00:00',
  },
  {
    orderId: 2,
    status: 'pending' as const,
    isReorder: true,
    groupName: 'CEOS 데모데이',
    customerName: '안세빈',
    pickupDate: '6월 15일(월) 오전 10:00',
    paymentAmount: 325000,
    paymentMethod: 'ON_SITE' as const,
    items: [{ menuName: '반반 세트', quantity: 55 }],
    orderDate: '2026-06-15T10:00:00',
  },
];
