import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesData } from '../admin/courses/courses.model';

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
}
