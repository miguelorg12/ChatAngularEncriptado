import { Component } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { Room } from '../../../models/room.model';
import { CommonModule } from '@angular/common';
import { Message } from '../../../models/messages.model';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  rooms: Room[] = [];
  messages: Message[] = [];
  users: User[] = []; 
  userid: number
  chat: boolean = false
  constructor(private socketService: SocketService, private chatService: ChatService
    , private cookie: CookieService, private authService: AuthService
  ) {
    this.socketService.on('newMessage').subscribe((data: any) => {
      console.log(data);
    });
    // this.socketService.emit('message', {'Hello World'});
    this.userid = parseInt(this.cookie.get('userId'));
    this.getMessages();
    this.getUsers();
  }
  getUsers(){
    this.authService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.map((user: any) => {
          return {
            ...user,
            name: this.capitalizeFirstLetter(user.username)
          };
        });
        console.log(this.users);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  getRooms(){
    this.chatService.getRooms().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getMessages(){
    this.chatService.getMessages().subscribe({
      next: (response: any) => {
        this.messages = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  filterRoomsandMessages(){

  }
  selectChatRoom(){

  }
  
  createMessage(){
    this.chatService.createMessage({message: 'Hello World', roomId: 1}).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  


}
