import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface loginUser {
  email: string,
  password: string
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:3001/api/auth/login";

  constructor(private httpClient: HttpClient) { }

  login(userCredentials: loginUser) {
    return this.httpClient.post<any>(this.loginUrl, userCredentials)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  getJwtToken() {
    return localStorage.getItem('token')
  }
}
