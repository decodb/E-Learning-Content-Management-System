import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface loginUser {
  email: string,
  password: string
} 

export interface UserPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  image?: string;
  bio?: string;
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
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getLoggedInUser() : UserPayload | undefined | null {
    const token = this.getJwtToken();
    if(token) {
      try {
        return jwtDecode(token)
      } catch(e) {
        return null
      }
    }

    return null;
  } 

  getJwtToken(): string | null {
    return localStorage.getItem('token')
  }
}
