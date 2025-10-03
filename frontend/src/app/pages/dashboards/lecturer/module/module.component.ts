import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { LecturerService } from '../../../../services/lecturer/lecturer.service';
import { Course, Item } from '../../../../services/lecturer/lecturer.model';
import { CourseNavLinkComponent } from '../../../../components/links/course-nav-link/course-nav-link.component';

@Component({
  selector: 'app-module',
  imports: [CourseNavLinkComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  courseId!: string;
  isLoading = signal<boolean>(false);
  courseData = signal<Course | null>(null);

  constructor(private route: ActivatedRoute, 
    private lecturerService: LecturerService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.isLoading.set(true);
    this.lecturerService.getCourse(this.courseId)
      .subscribe({
        next: ({ data }) => {
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
    { name: 'Assessments', path: 'assessments' },
    { name: 'Reviews', path: 'reviews' },
    { name: 'Students', path: 'students' }
  ];
}
