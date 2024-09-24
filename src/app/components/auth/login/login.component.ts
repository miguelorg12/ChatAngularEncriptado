import { Component } from '@angular/core';
import { Router, RouterLink  } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgxSpinnerModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private toast: ToastService,
    private loading: LoadingService
  ) {}

  login(){
    this.loading.loading();
      setTimeout(() => {
        this.loading.loadingHide();
        this.router.navigate(['/chat']);
        this.toast.showSuccess('Bienvenido', 'Loggeo Exitoso');
      }, 5000);
    
  }  
}
