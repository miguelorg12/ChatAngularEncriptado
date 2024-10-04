import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/enviroment';
import { User, UserLogin, UserRegister, UserVerify } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private cookies: CookieService, private http: HttpClient) {
      this.token = this.cookies.get('token');
      this.headers = this.headers.set('Authorization', `Bearer ${this.token}`);
      
  }
  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${environment.apiurl}/users`, {headers: this.headers});
  }
  login(login: UserLogin): Observable<User> {
      return this.http.post<User>(`${environment.apiurl}/auth/login`, login, {headers: this.headers, });
  }

  register(register: UserRegister): Observable<User> {
      return this.http.post<User>(`${environment.apiurl}/auth/register`, register, {headers: this.headers});
  }
  verifyCode(userId: number, code: string): Observable<User> {
      return this.http.post<User>(`${environment.apiurl}/auth/verify`, {userId, code}, {headers: this.headers});
  }

  

  
}
