import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastrService) { }
  showSuccess(message:string, title: string, timeOut:number = 2000){
    this.toast.success(message, title, {timeOut});
  }
  showError(message:string, title:string, timeOut:number = 2000){
    this.toast.error(message, title, {timeOut});
  }
  showInfo(message:string, title:string, timeOut:number = 2000){
    this.toast.info(message, title, {timeOut});
  }
  showWarning(message:string, title:string, timeOut:number = 2000){
    this.toast.warning(message, title, {timeOut});
  }
}
