import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecturer, LecturerInfo, LecturersData } from './lecturers.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  private getLecturersUrl: string = 'http://localhost:3001/api/admin/lecturers';
  private addLecturerUrl: string = 'http://localhost:3001/api/admin/addLecturer';

  constructor(private httpClient: HttpClient) { }

  getLecturers(): Observable<any> {
    return this.httpClient.get<LecturersData>(this.getLecturersUrl);
  }

  addLecturer(data: LecturerInfo): Observable<any> {
    return this.httpClient.post<any>(this.addLecturerUrl, data)
  }

}
