import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, signal } from '@angular/core';
import { CourseComponent } from '../../../../components/course/course.component';
import { CourseSkeletonComponent } from '../../../../components/course-skeleton/course-skeleton.component';
import { CoursesData } from '../../../../services/admin/courses/courses.model';
import { LecturerService } from '../../../../services/lecturer/lecturer.service';

@Component({
  selector: 'app-modules',
  imports: [CourseComponent, CourseSkeletonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
  searchQuery = signal('');
  coursesData = signal<CoursesData>({
    currentPage: 1,
    totalLecturers: 0,
    totalPages: 0,
    courses: []
  });
  isLoading = signal<boolean>(false);

  constructor(private lecturerService: LecturerService) {
    effect(() => {
      const query = this.searchQuery();
      this.fetchCourses(query);
    });
  }

  fetchCourses(query: string) {
    this.isLoading.set(true);

    this.lecturerService.getCourses(query)
      .subscribe({
        next: ({ data }) => {
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
