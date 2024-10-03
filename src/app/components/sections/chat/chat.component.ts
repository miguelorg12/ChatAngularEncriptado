import { Component } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(private socketService: SocketService) {
    this.socketService.on('newMessage').subscribe((data: any) => {
      console.log(data);
    });
    // this.socketService.emit('message', 'Hello World');
  }


}
