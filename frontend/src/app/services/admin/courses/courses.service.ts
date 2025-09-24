import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCourse, Category, CoursesData, Instructor } from './courses.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesUrl = 'http://localhost:3001/api/admin/courses';
  private categoriesUrl = 'http://localhost:3001/api/admin/categories';
  private lecturersUrl = 'http://localhost:3001/api/admin/assignLecturers';
  private addCourseUrl = 'http://localhost:3001/api/admin/addCourse';
  constructor(private httpClient: HttpClient) { }
  
  addCourse(courseInfo: AddCourse): Observable<any> {
    return this.httpClient.post<any>(this.addCourseUrl, courseInfo);
  }

  getCourses(searchQuery: string): Observable<any> {
    const params = { search: searchQuery };
  
    return this.httpClient.get<CoursesData>(this.coursesUrl, { params });
  }

  getCategories(): Observable<any> {
    return this.httpClient.get<Category[]>(this.categoriesUrl);
  }
  
  getLecturers(): Observable<any> {
    return this.httpClient.get<Instructor[]>(this.lecturersUrl);
  }
}
