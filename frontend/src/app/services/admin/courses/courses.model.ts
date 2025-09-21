export interface CoursesData {
  currentPage: number;
  totalLecturers: number;
  totalPages: number;
  courses: Course[];
}

export interface Course {
  name: string;
  code: string;
  description: string;
  image_url: string | null;  
  first_name: string;
  last_name: string
}