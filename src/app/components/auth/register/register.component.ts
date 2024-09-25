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
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgxSpinnerModule, CommonModule, ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  backendErrors: any;
  constructor(private router: Router, private toast: ToastService, private auth:AuthService, private loading: LoadingService) {}
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirmation: new FormControl('', [Validators.required])
  });

  register(){
    this.loading.loading();
    if (this.registerForm.valid){
      this.auth.register(this.registerForm.value).subscribe({ 
      next: (response: any) => {
        setTimeout(() => {
        this.loading.loadingHide();
        this.router.navigate(['/login']);
        this.toast.showSuccess('Por favor inicia sesión','Registro Exitoso', 4000);
        }, 3000);
        
        
      }, error: (error: HttpErrorResponse) => {
        this.loading.loadingHide();
        if(error.status === 400){
          this.backendErrors = error.error.message[0];
          
        }
        else{
          this.toast.showError('Error en el servidor', 'Error', 3000);
        }
      }})
      
    }
    
  }

}
