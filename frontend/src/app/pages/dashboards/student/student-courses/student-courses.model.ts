export interface Course {
  id: number,
  name: string;
  code: string;
  description: string;
  image_url: string | null;  
  first_name: string;
  last_name: string
}

export interface CoursesData {
  currentPage: number;
  totalLecturers: number;
  totalPages: number;
  courses: Course[];
}
