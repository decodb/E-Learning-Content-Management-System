import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LecturerComponent } from "../../../../components/lecturer/lecturer.component";
import { LecturersService } from '../../../../services/admin/lecturers/lecturers.service';
import { LecturersData } from '../../../../services/admin/lecturers/lecturers.model';

@Component({
  selector: 'app-lecturers',
  imports: [RouterLink, LecturerComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.css'
})
export class LecturersComponent implements OnInit {
  lecturersData = signal<LecturersData>({
    currentPage: 1,
    totalLecturers: 0,
    totalPages: 0,
    lecturers: []
  });
  isLoading = signal<boolean>(false);

  constructor (private lecturersService: LecturersService) {}

  ngOnInit(): void {
    this.isLoading.set(true)
    this.lecturersService.getLecturers()
      .subscribe({
        next: ({ data }) => {
          this.lecturersData.set({
            currentPage: data.currentPage,
            totalLecturers: data.totalLecturers,
            totalPages: data.totalPages,
            lecturers: data.lecturers
          })
          this.isLoading.set(false)
        }, error: (error) => {
          console.log(error)
          this.isLoading.set(false);
        }
      })

  }
}
