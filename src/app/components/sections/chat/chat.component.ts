import { Component } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { Room } from '../../../models/room.model';
import { CommonModule } from '@angular/common';
import { Message } from '../../../models/messages.model';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { response } from 'express';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  rooms: Room[] = [];
  messages: Message[] = [];
  users: User[] = []; 
  userid: number
  chat: boolean = false
  noMsg: boolean = false
  message: string = '';
  currentChat: number = 0
  selectedUser: number = 0
  private subscriptions: Subscription = new Subscription();
  constructor(private socketService: SocketService, private chatService: ChatService
    , private cookie: CookieService, private authService: AuthService
  ) {
    const socketSubscription = this.socketService.on('newMessage').subscribe((data: any) => {
      console.log(data);
      this.messages.push(data);
    });
    this.subscriptions.add(socketSubscription);
    this.userid = parseInt(this.cookie.get('userId'));
    this.getUsers();
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
     this.socketService.disconnect();
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

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  createMessage(){
    if (this.message.trim()) {
      this.socketService.emit('message', { message: this.message, roomId: this.currentChat });
      this.message = '';
      this.getMessages(this.currentChat)
    }
    error: (error: any) => {
      console.log(error);
    }
  }

  getMessages(userId: number) {
    this.currentChat = userId;
    this.selectedUser = userId;
    this.chat = true;
    console.log(this.currentChat);
    this.chatService.getMessage(userId).subscribe({
      next: (response: any) => {
        this.messages = response.map((message: Message) => ({
          ...message,
        }));
        console.log(this.messages);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}