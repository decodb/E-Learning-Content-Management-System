export interface Course {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;   
  category_name: string;
  average_rating: string;
  total_reviews: string;
}

export interface Item {
  name: string;
  path: string;
}
