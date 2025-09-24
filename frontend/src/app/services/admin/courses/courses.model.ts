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

export interface AddCourse {
  name: string,
  code: string,
  description: string,
  category: string,
  assign: string,
}

export interface Category {
  id: string,
  name: string
}

export interface Instructor {
  id: number,
  first_name: string,
  last_name: string
}