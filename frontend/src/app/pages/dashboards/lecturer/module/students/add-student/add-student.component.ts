import { Component, effect, input, OnInit, signal } from '@angular/core';
import { LecturerService } from '../../../../../../services/lecturer/lecturer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewStudent } from './student.model';

@Component({
  selector: 'app-add-student',
  imports: [ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit {
  courseId!: string;
  isLoading = signal<boolean>(false);

  constructor(private lecturersService: LecturerService, private router: Router, private route: ActivatedRoute) {}
  
  form = new FormGroup({
    first_name: new FormControl('', { validators: [Validators.required,Validators.minLength(3)]}),
    last_name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]})
  })
  
  ngOnInit(): void {
    this.courseId = this.route.parent?.parent?.snapshot.paramMap.get('id')!;
  }

  navigate() {
    this.router.navigate([`/dashboard/lecturer/modules/${this.courseId}/students`]);
  }

  onSubmit() {
    if(this.form.invalid) return
    
    const student : NewStudent = {
      first_name: this.form.value.first_name!,
      last_name: this.form.value.last_name!,
      email: this.form.value.email!
    }

    this.isLoading.set(true);
    this.lecturersService.addStudent(this.courseId, student)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isLoading.set(false);
          this.router.navigate([`/dashboard/lecturer/modules/${this.courseId}/students`]);
        },
        error: (error) => {
          console.log(error)
          this.isLoading.set(false)
        }
      })
  }
}
