import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCourse, Category, Instructor } from '../../../../../services/admin/courses/courses.model';
import { CoursesService } from '../../../../../services/admin/courses/courses.service';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {
  categories = signal<Category[]>([]);
  lecturers = signal<Instructor[]>([]);
  isLoading = signal<boolean>(false);
  private coursesService = inject(CoursesService)

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchLecturers();
  }
  
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    code: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(15)] }),
    category: new FormControl('', { validators: [Validators.required] }),
    assign: new FormControl('', { validators: [Validators.required] })     
  });


  

  onSubmit() {
    if(this.form.invalid) return

    this.isLoading.set(true);
    const courseInfo: AddCourse = {
      name: this.form.value.name!,
      code: this.form.value.code!,
      description: this.form.value.description!,
      category: this.form.value.category!,
      assign: this.form.value.assign!
    };

    this.coursesService.addCourse(courseInfo).subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading.set(false)
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
      }
    })

    
  }

  fetchCategories(): void {
    this.coursesService.getCategories().subscribe({
      next: ({ data }) => {
        this.categories.set(data);
      }
    })
  }

  fetchLecturers(): void {
    this.coursesService.getLecturers().subscribe({
      next: ({ data }) => {
        this.lecturers.set(data);
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  navigate() {
    this.router.navigate(['/dashboard/admin/courses'])
  }
}
