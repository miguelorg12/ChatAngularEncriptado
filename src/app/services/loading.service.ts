import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinnerService: NgxSpinnerService) { }

  loading(){
    this.spinnerService.show(undefined,
      {
        type: 'square-jelly-box',
        size: 'medium',
        bdColor: 'rgba(0,0,0,0.8)',
        color: 'white'
      }
    );
  }
  loadingHide(){
   this.spinnerService.hide();
  }
}
