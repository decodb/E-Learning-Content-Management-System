import { Component, input } from '@angular/core';
import { FileRecord } from '../../pages/dashboards/lecturer/module/course-content/file.model';

@Component({
  selector: 'app-file',
  imports: [],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent {
  fileData = input.required<FileRecord>()
}
