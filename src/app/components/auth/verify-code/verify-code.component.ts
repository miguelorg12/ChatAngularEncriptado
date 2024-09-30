import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule, ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
  backendErrors: any;
  constructor(private router: Router, private toast: ToastService, private loading: LoadingService, private auth: AuthService, private cookie: CookieService) {}
  codeForm: FormGroup = new FormGroup({
    code1: new FormControl('', [Validators.required,]),
    code2: new FormControl('', [Validators.required,]),
    code3: new FormControl('', [Validators.required,]),
    code4: new FormControl('', [Validators.required,]),
    code5: new FormControl('', [Validators.required,]),
    code6: new FormControl('', [Validators.required,]),
  });
  moveFocus(event: KeyboardEvent, nextInput: HTMLInputElement, previousInput: HTMLInputElement) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      nextInput.focus();
    } else if (event.key === 'Backspace' && input.value.length === 0) {
      previousInput.focus();
    }
  }

  verifyCode() {
    this.loading.loading();
    if(this.codeForm.valid){
      const userId = parseInt(this.cookie.get('userId'));
      const code = this.codeForm.value.code1 + this.codeForm.value.code2 + this.codeForm.value.code3 + this.codeForm.value.code4 + this.codeForm.value.code5 + this.codeForm.value.code6;
     ;
      this.auth.verifyCode(userId, code).subscribe({
        next: (response: any) => {
          console.log(response);
          this.cookie.set('token', response.token, 86400000);
          setTimeout(() => {
            this.loading.loadingHide();
            this.router.navigate(['/chat']);
            this.toast.showSuccess('Código verificado', 'Bienvenido', 4000);
          }, 1000);
          
        },
        error: (error: HttpErrorResponse) => {
          this.loading.loadingHide();
          console.log(error);
          if(error.status === 401){
            this.toast.showError('Código incorrecto', 'Error', 3000);
          }
          else{
            this.toast.showError('Error en el servidor', 'Error', 3000);
          }
        }
      });
    }
    else{
      
    }
  }

}
