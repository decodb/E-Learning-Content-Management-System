import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LecturerService } from '../../../../../../services/lecturer/lecturer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileForm } from './upload-file.model';

@Component({
  selector: 'app-upload-file',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit {
  courseId!: string;
  isLoading = signal<boolean>(false);
  message = signal<string>('');

  constructor(private lecturersService: LecturerService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.parent?.parent?.snapshot.paramMap.get('id')!;
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl<File | null>(null, Validators.required),
  });

  navigate() {
    this.router.navigate([`/dashboard/lecturer/modules/${this.courseId}/content`]);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.form.patchValue({
        file: file
      });
      // Optional: mark the control as touched to show validation messages
      this.form.get('file')?.markAsTouched();
    }
  }


  onSubmit() {
      if(this.form.invalid) return

      this.isLoading.set(true);
      const fileData : FileForm = {
        title: this.form.value.title!,
        file: this.form.value.file!
      }

      this.lecturersService.uploadFile(this.courseId, fileData)
        .subscribe({
          next: ({ message }) => {
            this.message.set(message);
            this.isLoading.set(false)
          }, error: (error) => {
            console.log(error);
            this.isLoading.set(false)
          }
        })
    }
}
