export interface Student {
    id: number,
    image_url: string | null,
    first_name: string,
    last_name: string
    email: string,
    enrolled_at: string,
    grade: number,
    status: string,
}

export interface StudentsData {
  currentPage: number;
  totalStudents: number;
  totalPages: number;
  students: Student[];
}