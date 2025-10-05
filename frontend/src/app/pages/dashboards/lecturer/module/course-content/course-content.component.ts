import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FileComponent } from '../../../../../components/file/file.component';
import { FileRecordsData } from './file.model';
import { LecturerService } from '../../../../../services/lecturer/lecturer.service';

@Component({
  selector: 'app-course-content',
  imports: [RouterOutlet, FileComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent implements OnInit{
  courseId!: string;
  isLoading = signal<boolean>(false);
  filesData = signal<FileRecordsData>({
      currentPage: 1,
      totalFiles: 0,
      totalPages: 0,
      files: []
  });
  errorMessage = signal<string>('');

  constructor(private lecturerService: LecturerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.fetchFiles(this.courseId);
  }

  fetchFiles(id: string) {
    this.isLoading.set(true);

    this.lecturerService.getFiles(id)
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
