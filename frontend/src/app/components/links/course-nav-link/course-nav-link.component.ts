import { Component, input } from '@angular/core';
import { Item } from '../../../services/lecturer/lecturer.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-course-nav-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './course-nav-link.component.html',
  styleUrl: './course-nav-link.component.css'
})
export class CourseNavLinkComponent {
  inputLink = input.required<Item>();
}
