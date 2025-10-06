import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FileComponent } from '../../../../../components/file/file.component';
import { StudentService } from '../../../../../services/student/student.service';
import { ActivatedRoute } from '@angular/router';
import { FileRecordsData } from '../../../lecturer/module/course-content/file.model';

@Component({
  selector: 'app-uploads',
  imports: [FileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.css'
})
export class UploadsComponent {
  courseId!: string;
  isLoading = signal<boolean>(false);
  filesData = signal<FileRecordsData>({
      currentPage: 1,
      totalFiles: 0,
      totalPages: 0,
      files: []
  });
  errorMessage = signal<string>('');

  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.fetchFiles(this.courseId);
  }

  fetchFiles(id: string) {
    this.isLoading.set(true);

    this.studentService.getContent(id)
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.filesData.set({
            currentPage: data.currentPage,
            totalFiles: data.totalFiles,
            totalPages: data.totalPages,
            files: data.files
          });
          this.isLoading.set(false);
        },
        error: ({ error }) => {
          this.errorMessage.set(error.message)
          this.isLoading.set(false);
        }
      });
  }
}
