import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-add-student',
  imports: [],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  isLoading = signal<boolean>(false);
}
