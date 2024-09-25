import { Component } from '@angular/core';
import { Router, RouterLink  } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgxSpinnerModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private router: Router, private toast: ToastService,
    private loading: LoadingService,
    private auth: AuthService
    
  ) {}
  backendErrors: any;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  login(){
    this.loading.loading();
    if (this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          setTimeout(() => {
            this.loading.loadingHide();
            this.router.navigate(['/chat']);
            this.toast.showSuccess('Bienvenido', 'Loggeo Exitoso', 4000);
          }, 5000);
        }, error: (error: HttpErrorResponse) => {
          this.loading.loadingHide();
          console.log(error);
          if(error.status === 400){
            this.backendErrors = error.error.message[0];
          } else {
            this.toast.showError('Error en el servidor', 'Error', 3000);
          }
        }
      });
    }
  }  
}
