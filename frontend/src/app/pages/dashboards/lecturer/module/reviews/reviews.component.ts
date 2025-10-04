import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { ReviewComponent } from "../../../../../components/review/review.component";
import { ReviewsData } from './review.model';
import { LecturerService } from '../../../../../services/lecturer/lecturer.service';
import { ActivatedRoute } from '@angular/router';
import { CourseSkeletonComponent } from '../../../../../components/course-skeleton/course-skeleton.component';

@Component({
  selector: 'app-reviews',
  imports: [ReviewComponent, CourseSkeletonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  courseId !: string;
  reviewsData = signal<ReviewsData>({
    currentPage: 1,
    totalReviews: 0,
    totalPages: 0,
    reviews: []
  })
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private lecturerService: LecturerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.fetchReviews(this.courseId);
  }

  fetchReviews(id: string) {
    this.isLoading.set(true);

    this.lecturerService.getReviews(id)
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.isLoading.set(false)
        }, error: ({ error }) => {
          const { message } = error;
          this.errorMessage.set(message)
          this.isLoading.set(false)
        }
      })
  }

}