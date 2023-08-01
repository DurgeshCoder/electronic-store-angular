import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginresponse.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  generateToken(loginData: { email: string; password: string }) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      loginData
    );
  }
}
