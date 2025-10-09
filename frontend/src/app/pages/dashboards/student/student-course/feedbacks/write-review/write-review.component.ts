import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReview } from './review.model';
import { StudentService } from '../../../../../../services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-write-review',
  imports: [ReactiveFormsModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.css'
})
export class WriteReviewComponent {
  courseId !: string;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  form = new FormGroup({
    rating: new FormControl('', {
      validators: [Validators.required]
    }),
    comment: new FormControl('', {
      validators: [Validators.required, Validators.minLength(30)]
    })
  })

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.courseId = this.route.parent?.parent?.snapshot.paramMap.get('id')!;
  }


  onSubmit() {
    
    if(this.form.invalid) return

    this.isLoading.set(true);
    const userReview: UserReview = {
      rating: Number(this.form.value.rating)!,
      comment: this.form.value.comment!
    };

    this.studentService.postReview(this.courseId, userReview)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isLoading.set(false);
          this.router.navigate([`/dashboard/student/modules/${this.courseId}/reviews/my-reviews`])
        },
        error: (error) => {
          console.log(error);
          this.isLoading.set(false);
        }
      })

  }
}
