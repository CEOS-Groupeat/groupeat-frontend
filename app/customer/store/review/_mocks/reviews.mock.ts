export const mockReviews = [
  {
    reviewId: 1,
    userName: '세빙빙',
    rating: 5,
    createdAt: '3일 전',
    eventType: '강연',
    headCount: 56,
    budgetPerPerson: 8000,
    content:
      '와, 여기 샌드위치 진짜 뚱뚱하네요! 내용물이 흘러넘칠 정도로 가득 채워주셔서 반쪽만 먹어도 배가 엄청 불러요. 재료들이 조화롭게 어우러지고, 무엇보다 끝까지 먹어도 빵이 눅눅해지지 않아서 좋았어요. 근처에서 가성비 최고인 듯합니다...',
    images: ['/images/customer_review_1.png', '/images/customer_review_2.png'],
    menuTags: ['반반 세트', '참치 김밥 + 에그마요 샌드위치 세트'],
    ownerReply: {
      storeName: '데이브런치',
      content:
        '세빙빙님, 맛있게 드셔주셔서 감사합니다!\n오늘도 좋은 하루 보내세요:)',
      createdAt: '오늘',
    },
  },
  {
    reviewId: 2,
    userName: '세빙빙',
    rating: 1,
    createdAt: '3일 전',
    eventType: '강연',
    headCount: 56,
    budgetPerPerson: 8000,
    content:
      '와, 여기 샌드위치 진짜 뚱뚱하네요! 내용물이 흘러넘칠 정도로 가득 채워주셔서 반쪽만 먹어도 배가 엄청 불러요. 재료들이 조화롭게 어우러지고, 무엇보다 끝까지 먹어도 빵이 눅눅해지지 않아서 좋았어요. 근처에서 가성비 최고인 듯합니다...',
    images: [],
    menuTags: ['반반 세트'],
    ownerReply: {
      storeName: '데이브런치',
      content:
        '세빙빙님, 맛있게 드셔주셔서 감사합니다!\n오늘도 좋은 하루 보내세요:)',
      createdAt: '오늘',
    },
  },
  {
    reviewId: 3,
    userName: '세빙빙',
    rating: 3,
    createdAt: '3일 전',
    eventType: '강연',
    headCount: 56,
    budgetPerPerson: 8000,
    content:
      '와, 여기 샌드위치 진짜 뚱뚱하네요! 내용물이 흘러넘칠 정도로 가득 채워주셔서 반쪽만 먹어도 배가 엄청 불러요. 재료들이 조화롭게 어우러지고, 무엇보다 끝까지 먹어도 빵이 눅눅해지지 않아서 좋았어요. 근처에서 가성비 최고인 듯합니다...',
    images: ['/images/customer_review_2.png', '/images/customer_review_1.png'],
    menuTags: ['반반 세트', '참치 김밥 + 에그마요 샌드위치 세트'],
    ownerReply: {
      storeName: '데이브런치',
      content:
        '세빙빙님, 맛있게 드셔주셔서 감사합니다!\n오늘도 좋은 하루 보내세요:)',
      createdAt: '오늘',
    },
  },
];

export const mockReviewSummary = {
  averageRating: 4.7,
  distribution: [
    { score: 5, count: 30 },
    { score: 4, count: 1 },
    { score: 3, count: 0 },
    { score: 2, count: 0 },
    { score: 1, count: 0 },
  ],
};
