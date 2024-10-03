import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviroment';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private token: string;
  private socket: Socket
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private cookies: CookieService, ) {
      this.token = this.cookies.get('token');
      this.headers = this.headers.set('Authorization', `Bearer ${this.token}`);
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
