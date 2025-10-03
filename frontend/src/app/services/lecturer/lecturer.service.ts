import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesData } from '../admin/courses/courses.model';
import { Course } from './lecturer.model';
import { Student } from '../../components/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private modulesUrl = 'http://localhost:3001/api/lecturer/courses';

  constructor(private httpClient: HttpClient) { }

  getCourses(searchQuery: string): Observable<any> {
    const params = { search: searchQuery };
    
    return this.httpClient.get<CoursesData>(this.modulesUrl, { params });
  }

  getCourse(id: string): Observable<any> {
    return this.httpClient.get<Course>(`http://localhost:3001/api/lecturer/courses/${id}`);
  }

  getStudents(id: string ,searchQuery: string): Observable<any> {
    const params = { search: searchQuery };

    return this.httpClient.get<Student>(`http://localhost:3001/api/lecturer/courses/${id}/students`, { params });
  }
}