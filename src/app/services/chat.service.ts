import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/enviroment';
import { Message, CreateMessage } from '../models/messages.model';
import { Room } from '../models/room.model';
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

  

  getMessage(userId:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiurl}/messages/${userId}`, { headers: this.headers });
  }

  createMessage(message: CreateMessage): Observable<CreateMessage> {
    return this.http.post<CreateMessage>(`${environment.apiurl}/messages`, message, { headers: this.headers });
  }

  lastMessage(userId:number): Observable<Message> {
    return this.http.get<Message>(`${environment.apiurl}/messages/last/${userId}`, { headers: this.headers });
  }

  // getRooms(): Observable<Room[]> {
  //   return this.http.get<Room[]>(${environment.apiurl}/rooms, { headers: this.headers });
  // }

  // getRoom(id: number): Observable<Room> {
  //   return this.http.get<Room>(${environment.apiurl}/rooms/${id}, { headers: this.headers });
  // }

  // createRoom(room: Room): Observable<Room> {
  //   return this.http.post<Room>(${environment.apiurl}/rooms, room, { headers: this.headers });
  // }



  
}