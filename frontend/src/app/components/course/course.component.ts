import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { Course } from '../../services/admin/courses/courses.model';
import { AuthService, UserPayload } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent{
  course = input.required<Course>();
  loggedInUser = signal<UserPayload | null | undefined>(undefined);

  constructor(private authService: AuthService) {
    this.loggedInUser.set(this.authService.getLoggedInUser())
  }
}
