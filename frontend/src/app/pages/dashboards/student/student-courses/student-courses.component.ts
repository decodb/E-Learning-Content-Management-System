import { Component, effect, signal } from '@angular/core';
import { StudentService } from '../../../../services/student/student.service';
import { CoursesData } from './student-courses.model';
import { CourseSkeletonComponent } from '../../../../components/course-skeleton/course-skeleton.component';
import { CourseComponent } from '../../../../components/course/course.component';

@Component({
  selector: 'app-student-courses',
  imports: [CourseSkeletonComponent, CourseComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent {
  searchQuery = signal('');
  coursesData = signal<CoursesData>({
    currentPage: 1,
    totalLecturers: 0,
    totalPages: 0,
    courses: []
  });
  isLoading = signal<boolean>(false);

  constructor(private studentService: StudentService) {
    effect(() => {
      const query = this.searchQuery();
      this.fetchCourses(query);
    });
  }

  fetchCourses(query: string) {
    this.isLoading.set(true);

    this.studentService.getCourses(query)
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.coursesData.set({
            currentPage: data.currentPage,
            totalLecturers: data.totalCourses,
            totalPages: data.totalPages,
            courses: data.courses
          });
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error(error);
          this.isLoading.set(false);
        }
      });
  }


  ngOnInit(): void {
    this.fetchCourses(this.searchQuery());
  }
}
