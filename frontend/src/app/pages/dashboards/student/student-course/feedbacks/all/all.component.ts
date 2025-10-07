import { Component, signal } from '@angular/core';
import { ReviewsData } from '../../../../lecturer/module/reviews/review.model';
import { StudentService } from '../../../../../../services/student/student.service';
import { ActivatedRoute } from '@angular/router';
import { CourseSkeletonComponent } from '../../../../../../components/course-skeleton/course-skeleton.component';
import { ReviewComponent } from '../../../../../../components/review/review.component';

@Component({
  selector: 'app-all',
  imports: [CourseSkeletonComponent, ReviewComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
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

    this.studentService.getReviews(id)
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
