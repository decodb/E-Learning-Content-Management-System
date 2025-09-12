import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LecturerComponent } from "../../../../components/lecturer/lecturer.component";

@Component({
  selector: 'app-lecturers',
  imports: [RouterLink, LecturerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.css'
})
export class LecturersComponent {

}
