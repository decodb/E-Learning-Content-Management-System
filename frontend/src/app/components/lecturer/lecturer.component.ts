import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { Lecturer } from '../../services/admin/lecturers/lecturers.model';

@Component({
  selector: 'app-lecturer',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {
  lecturer = input.required<Lecturer>();
  isShowDropDown = signal<boolean>(false);

  toggleDropDown() {
    this.isShowDropDown.set(!this.isShowDropDown())
  }
}
