import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastr:ToastrService
  ) { }

  errorHandler(err:any){
    if (err.status == 400 || err.status == 401) {
      this.toastr.error(err.error);
    }else{
      this.toastr.error("Bilinmeyen bir hata meydana geldi!");
    }
  }
}
