import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { StudentComponent } from "../../../../../components/student/student.component";
import { LecturerService } from '../../../../../services/lecturer/lecturer.service';
import { StudentsData } from '../../../../../components/student/student.model';

@Component({
  selector: 'app-students',
  imports: [StudentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  isLoading = signal<boolean>(false);
  searchQuery = signal<string>('')
  studentsData = signal<StudentsData>({
    currentPage: 1,
    totalStudents: 0,
    totalPages: 0,
    students: []
  })

  constructor(private lecturerService: LecturerService) {}

  ngOnInit(): void {
    //this.lecturerService.
  }
}
