export interface IReview {
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string;
}

export interface IReviewUpdate {
  rating?: number;
  comment?: string;
}