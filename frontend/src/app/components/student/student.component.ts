import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Student } from './student.model';

@Component({
  selector: 'app-student',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  //studentData = input.required<Student>()
}
