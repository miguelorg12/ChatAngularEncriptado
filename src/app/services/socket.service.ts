import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/enviroment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private token: string;
  private headers: HttpHeaders;

  constructor(private cookies: CookieService) {
    this.token = this.cookies.get('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.socket = io(environment.socketUrl, {
      extraHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}