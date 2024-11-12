export interface Review {
  reviewId?: number;
  MovieId: number;
  UserId: number;
  Rating: number;
  Comment: string;
  Date?: string;
}
