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

export interface AddStudentResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      image_url: string | null;
      bio: string | null;
      created_at: string;
      updated_at: string;
      role_id: number;
    };
    enrollment: {
      id: number;
      user_id: number;
      course_id: number;
      enrolled_at: string;
      grade: string | null;
      status: string;
    };
  };
}