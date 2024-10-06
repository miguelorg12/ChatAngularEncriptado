import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/enviroment';
import { Message, CreateMessage } from '../models/messages.model';
import { Room } from '../models/room.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private secretKey = '90d004e4601cb2c30b90ba5311e370dd13f3758b0e1ae560029bbf9892a2d6b1';
  private token: string;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private cookiesService: CookieService, private http: HttpClient) {
    this.token = this.cookiesService.get('token');
    this.headers = this.headers.set('Authorization', `Bearer ${this.token}`);
  }

  decryptMessage(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  getMessage(userId:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiurl}/messages/${userId}`, { headers: this.headers });
  }

  createMessage(message: CreateMessage): Observable<CreateMessage> {
    return this.http.post<CreateMessage>(`${environment.apiurl}/messages`, message, { headers: this.headers });
  }

  lastMessage(userId:number): Observable<Message> {
    return this.http.get<Message>(`${environment.apiurl}/messages/last/${userId}`, { headers: this.headers });
  }
}