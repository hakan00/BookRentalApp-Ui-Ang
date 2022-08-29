import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../components/service/error.service';
import { LoginModel } from '../model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient,
    private router:Router,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private errorService:ErrorService
  ) { }

  login(loginModel:LoginModel){
    this.spinner.show();
    let api = this.apiUrl + "users/login";
    this.httpClient.post(api,loginModel).subscribe((res:any)=>{
      this.spinner.hide();
      localStorage.setItem("token", res.data.token);
      this.toastr.success("Giriş işlemi başarılı");
      this.router.navigate(["/"])
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
