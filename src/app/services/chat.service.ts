import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/enviroment';
import { Message, CreateMessage } from '../models/messages.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private token: string;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private cookiesService: CookieService, private http: HttpClient) {
    this.token = this.cookiesService.get('token');
    this.headers = this.headers.set('Authorization', `Bearer ${this.token}`);
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiurl}/messages`, { headers: this.headers });
  }

  createMessage(message: CreateMessage): Observable<Message> {
    return this.http.post<Message>(`${environment.apiurl}/messages`, message, { headers: this.headers });
  }
  
}
