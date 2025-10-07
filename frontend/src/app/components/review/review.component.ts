import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { Review } from '../../pages/dashboards/lecturer/module/reviews/review.model';

@Component({
  selector: 'app-review',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviewData = input.required<Review>()
}
