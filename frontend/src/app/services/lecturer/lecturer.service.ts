import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesData } from '../admin/courses/courses.model';
import { AddStudentResponse, Course } from './lecturer.model';
import { Student } from '../../components/student/student.model';
import { NewStudent } from '../../pages/dashboards/lecturer/module/students/add-student/student.model';
import { Review } from '../../pages/dashboards/lecturer/module/reviews/review.model';
import { FileRecordsData } from '../../pages/dashboards/lecturer/module/course-content/file.model';
import { FileForm } from '../../pages/dashboards/lecturer/module/course-content/upload-file/upload-file.model';

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

  addStudent(id: string, data: NewStudent): Observable<any> {
    return this.httpClient.post<AddStudentResponse>(`http://localhost:3001/api/lecturer/courses/${id}/students/add`, data);
  }

  getReviews(id: string): Observable<any> {
    return this.httpClient.get<Review>(`http://localhost:3001/api/lecturer/courses/${id}/reviews`);
  }

  getFiles(id: string) : Observable<any> {
    return this.httpClient.get<FileRecordsData>(`http://localhost:3001/api/lecturer/courses/${id}/files`);
  }

  uploadFile(id: string, fileData: FileForm): Observable<any> {
    const formData = new FormData();
    formData.append('title', fileData.title);
    formData.append('file', fileData.file!); // must be File object

    return this.httpClient.post(`http://localhost:3001/api/lecturer/courses/${id}/upload`, formData)
  }
}