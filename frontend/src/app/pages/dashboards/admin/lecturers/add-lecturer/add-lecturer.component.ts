import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LecturersService } from '../../../../../services/admin/lecturers/lecturers.service';
import { LecturerInfo } from '../../../../../services/admin/lecturers/lecturers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lecturer',
  imports: [ReactiveFormsModule],
  templateUrl: './add-lecturer.component.html',
  styleUrl: './add-lecturer.component.css'
})
export class AddLecturerComponent {
  isLoading = signal<boolean>(false);

  constructor(private lecturersService: LecturersService, private router: Router) {}
  
  form = new FormGroup({
    first_name: new FormControl('', { validators: [Validators.minLength(3)]}),
    last_name: new FormControl('', { validators: [Validators.minLength(4)]}),
    email: new FormControl('', {validators: [Validators.email]})
  })

  navigate() {
    this.router.navigate(['/dashboard/admin/lecturers'])
  }

  onSubmit() {

    if(this.form.invalid) return

    const lecturerInfo : LecturerInfo = {
      first_name: this.form.value.first_name!,
      last_name: this.form.value.last_name!,
      email: this.form.value.email!
    }

    this.isLoading.set(true);
    this.lecturersService.addLecturer(lecturerInfo)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isLoading.set(false)
        },
        error: (error) => {
          console.log(error)
          this.isLoading.set(false)
        }
      })

  }
}
