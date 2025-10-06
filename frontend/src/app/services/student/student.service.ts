import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesData } from '../../pages/dashboards/student/student-courses/student-courses.model';
import { FileRecordsData } from '../../pages/dashboards/lecturer/module/course-content/file.model';

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

  getContent(id: string): Observable<any> {
    return this.httpClient.get<FileRecordsData>(`http://localhost:3001/api/student/courses/${id}/content`);
  }
}
