export interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
}

export interface ReviewsData {
  currentPage: number;
  totalReviews: number;
  totalPages: number;
  reviews: Review[];
}