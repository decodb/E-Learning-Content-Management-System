export interface Lecturer {
  first_name: string;
  last_name: string;
  email: string;
  image_url: string | null;
  created_at: string;
  code: string;    
}

export interface LecturersData {
  currentPage: number;
  totalLecturers: number;
  totalPages: number;
  lecturers: Lecturer[];
}

export interface LecturerInfo {
  first_name : string,
  last_name: string,
  email: string
}