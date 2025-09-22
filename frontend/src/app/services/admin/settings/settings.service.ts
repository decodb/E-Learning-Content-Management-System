import { Injectable } from '@angular/core';
import { UserUpdate } from './settings.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private updateUserUrl = 'http://localhost:3001/api/admin/updateInfo';
  constructor(private httpClient: HttpClient) { }

  updateUser(fields: UserUpdate): Observable<any> {
    return this.httpClient.put<any>(this.updateUserUrl, fields)
  }
}
