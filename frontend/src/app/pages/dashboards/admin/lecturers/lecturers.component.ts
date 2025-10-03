import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LecturerComponent } from "../../../../components/lecturer/lecturer.component";
import { LecturersService } from '../../../../services/admin/lecturers/lecturers.service';
import { LecturersData } from '../../../../services/admin/lecturers/lecturers.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lecturers',
  imports: [RouterLink, LecturerComponent, RouterOutlet, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.css'
})
export class LecturersComponent implements OnInit {
  searchQuery = signal<string>('');
  lecturersData = signal<LecturersData>({
    currentPage: 1,
    totalLecturers: 0,
    totalPages: 0,
    lecturers: []
  });
  isLoading = signal<boolean>(false);

  constructor(private lecturersService: LecturersService) {
    effect(() => {
      const query = this.searchQuery();
      this.fetchLecturers(query);
    });
  }


  fetchLecturers(query: string) {
    this.isLoading.set(true);

    this.lecturersService.getLecturers(query)
      .subscribe({
        next: ({ data }) => {
          this.lecturersData.set({
            currentPage: data.currentPage,
            totalLecturers: data.totalLecturers,
            totalPages: data.totalPages,
            lecturers: data.lecturers
          });
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error(error);
          this.isLoading.set(false);
        }
      });
  }


  ngOnInit(): void {
    this.fetchLecturers(this.searchQuery());
  }
}
