import { Component } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-chat-contacts',
  standalone: true,
  imports: [],
  templateUrl: './chat-contacts.component.html',
  styleUrl: './chat-contacts.component.css'
})
export class ChatContactsComponent {

  constructor(public dialog: MatDialog) {
    
  }

}
