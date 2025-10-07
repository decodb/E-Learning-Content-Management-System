import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLink } from './link.model';

@Component({
  selector: 'app-review-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './review-link.component.html',
  styleUrl: './review-link.component.css'
})
export class ReviewLinkComponent {
  inputData = input.required<NavLink>();
}
