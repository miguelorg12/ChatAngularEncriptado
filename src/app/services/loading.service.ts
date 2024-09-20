import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinnerService: NgxSpinnerService) { }

  loading(){
    this.spinnerService.show(undefined);
  }
  loadingHide(){
   this.spinnerService.hide();
  }
}
