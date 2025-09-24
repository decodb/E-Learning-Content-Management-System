import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, signal } from '@angular/core';
import { CourseComponent } from "../../../../components/course/course.component";
import { CoursesData } from '../../../../services/admin/courses/courses.model';
import { CoursesService } from '../../../../services/admin/courses/courses.service';
import { CourseSkeletonComponent } from "../../../../components/course-skeleton/course-skeleton.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [RouterOutlet,RouterLink,CourseComponent, CourseSkeletonComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  searchQuery = signal('');
  coursesData = signal<CoursesData>({
    currentPage: 1,
    totalLecturers: 0,
    totalPages: 0,
    courses: []
  });
  isLoading = signal<boolean>(false);

  constructor(private coursesServices: CoursesService) {
    effect(() => {
      const query = this.searchQuery();
      this.fetchCourses(query);
    });
  }

  fetchCourses(query: string) {
    this.isLoading.set(true);

    this.coursesServices.getCourses(query)
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
