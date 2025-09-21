import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesData } from './courses.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesUrl = 'http://localhost:3001/api/admin/courses';
  constructor(private httpClient: HttpClient) { }
  
  getCourses(searchQuery: string): Observable<any> {
    const params = { search: searchQuery };
  
    return this.httpClient.get<CoursesData>(this.coursesUrl, { params });
  }
}
