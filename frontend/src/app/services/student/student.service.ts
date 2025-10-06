import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesData } from '../../pages/dashboards/student/student-courses/student-courses.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {}

  getCourses(searchQuery: string): Observable<any> {
    const params = { search: searchQuery };

    return this.httpClient.get<CoursesData>('http://localhost:3001/api/student/courses', { params });
  }

  getCourse(id: string): Observable<any> {
    return this.httpClient.get<CoursesData>(`http://localhost:3001/api/student/courses/${id}`);
  }
}
