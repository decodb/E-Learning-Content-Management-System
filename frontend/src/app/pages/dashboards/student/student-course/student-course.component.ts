import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Course, Item } from '../../../../services/lecturer/lecturer.model';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StudentService } from '../../../../services/student/student.service';
import { CourseNavLinkComponent } from '../../../../components/links/course-nav-link/course-nav-link.component';

@Component({
  selector: 'app-student-course',
  imports: [RouterOutlet, CourseNavLinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent {
  courseId!: string;
  isLoading = signal<boolean>(false);
  courseData = signal<Course | null>(null);

  constructor(private route: ActivatedRoute, 
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.isLoading.set(true);
    this.studentService.getCourse(this.courseId)
      .subscribe({
        next: ({ data }) => {
          console.log(data)
          this.courseData.set(data);
          this.isLoading.set(false);
        }, error: (error) => {
          console.log(error);
          this.isLoading.set(false);
        }
      })
  }

  navItems: Item[] = [
    { name: 'Course Content', path: 'content' },
    { name: 'Tests', path: 'tests' },
    { name: 'Reviews', path: 'reviews' },
  ];
}
