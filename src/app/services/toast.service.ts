import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastrService) { }
  showSuccess(message:string, title:string){
    this.toast.success(message, title);
  }
  showError(message:string, title:string){
    this.toast.error(message, title);
  }
  showInfo(message:string, title:string){
    this.toast.info(message, title);
  }
  showWarning(message:string, title:string){
    this.toast.warning(message, title);
  }
}
