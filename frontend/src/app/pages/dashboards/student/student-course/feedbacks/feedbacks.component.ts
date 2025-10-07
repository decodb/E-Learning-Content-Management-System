import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavLink } from '../../../../../components/links/review-link/link.model';
import { ReviewLinkComponent } from '../../../../../components/links/review-link/review-link.component';

@Component({
  selector: 'app-feedbacks',
  imports: [RouterLink, ReviewLinkComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent {
  studentLinks: NavLink[] = [
    {
      id: 1,
      path: 'all',
      text: 'All Reviews'
    },
    {
      id: 2,
      path: 'my-reviews',
      text: 'My Reviews'
    }
  ];
}
