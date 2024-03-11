import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/SignUp()`, userData);
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/Login()`, {
      username,
      password,
    });
  }

  storeUserSession(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearUserData() {
    localStorage.removeItem('user');
  }

  isAdmin(): boolean {
    const user = this.getUserData();
    console.log(user);
    return user && user.role === 'Admin';
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
