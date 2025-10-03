import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, OnInit, signal } from '@angular/core';
import { StudentComponent } from "../../../../../components/student/student.component";
import { LecturerService } from '../../../../../services/lecturer/lecturer.service';
import { StudentsData } from '../../../../../components/student/student.model';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-students',
  imports: [StudentComponent, RouterLink, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  courseId!: string;
  isLoading = signal<boolean>(false);
  searchQuery = signal<string>('')
  studentsData = signal<StudentsData>({
    currentPage: 1,
    totalStudents: 0,
    totalPages: 0,
    students: []
  });
  errorMessage = signal<string>('');

  constructor(private lecturerService: LecturerService, private route: ActivatedRoute ) {
    effect(() => {
      //this.fetchStudents(this.courseId, this.searchQuery());
    })
  }

  ngOnInit(): void {
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.fetchStudents(this.courseId, this.searchQuery());
  }

  fetchStudents(id: string, query: string) {
    this.isLoading.set(true);

    this.lecturerService.getStudents(id, query)
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.studentsData.set({
            currentPage: data.currentPage,
            totalStudents: data.totalLecturers,
            totalPages: data.totalPages,
            students: data.students
          });
          this.isLoading.set(false);
        },
        error: ({error}) => {
          this.errorMessage.set(error.message)
          this.isLoading.set(false);
        }
      });
  }
}
