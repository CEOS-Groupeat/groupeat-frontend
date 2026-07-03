export interface OwnerReply {
  storeName: string;
  content: string;
  createdAt: string;
}

export interface Review {
  reviewId: number;
  userName: string;
  rating: number;
  createdAt: string;
  eventType: string;
  headCount: number;
  budgetPerPerson: number;
  content: string;
  images: string[];
  menuTags: string[];
  ownerReply?: OwnerReply;
}

export interface RatingDistribution {
  score: number;
  count: number;
}