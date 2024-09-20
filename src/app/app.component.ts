import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChatEncriptado';
  constructor(private toastr: ToastrService) {}

  succesToast(){
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
