import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { StudentService } from '../../../../../../services/student/student.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewsData } from '../../../../lecturer/module/reviews/review.model';
import { CourseSkeletonComponent } from '../../../../../../components/course-skeleton/course-skeleton.component';
import { ReviewComponent } from '../../../../../../components/review/review.component';

@Component({
  selector: 'app-my-feedbacks',
  imports: [CourseSkeletonComponent, ReviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './my-feedbacks.component.html',
  styleUrl: './my-feedbacks.component.css'
})
export class MyFeedbacksComponent {
  courseId !: string;
  reviewsData = signal<ReviewsData>({
    currentPage: 1,
    totalReviews: 0,
    totalPages: 0,
    reviews: []
  })
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.parent?.parent?.snapshot.paramMap.get('id')!;
    this.fetchReviews(this.courseId);
  }

  fetchReviews(id: string) {
    this.isLoading.set(true);

    this.studentService.getMyReviews(id)
      .subscribe({
        next: ({ data }) => {
          this.reviewsData.set(data)
          this.isLoading.set(false)
        }, error: ({ error }) => {
          const { message } = error;
          this.errorMessage.set(message)
          this.isLoading.set(false)
        }
      })
  }
}
