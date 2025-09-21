import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Course } from '../../services/admin/courses/courses.model';

@Component({
  selector: 'app-course',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  course = input.required<Course>();
}
