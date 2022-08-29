import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../service/error.service';
import { BookModel } from '../model/bookModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router,
    private errorService:ErrorService
  ) { }

  add(file:any,bookModel:BookModel):boolean{
    this.spinner.show();
    let api = this.apiUrl + "books/addImage";

    this.httpClient.post(api,file).subscribe((res:any)=>{
      let fileName = res.fileName;
      bookModel.imageUrl = fileName;

      let api = this.apiUrl + "books/add";
      this.httpClient.post(api, bookModel).subscribe((res:any)=>{
        this.spinner.hide();
        this.toastr.success(res.message);
        return true;
      },(err)=>{
        this.spinner.hide();
        this.errorService.errorHandler(err);
        return false;
      })
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
      return false;
    });
    return true;
  }

  updateImageAndModel(file:any,bookModel:BookModel):boolean{
    this.spinner.show();
    let api = this.apiUrl + "books/addImage";

    this.httpClient.post(api,file).subscribe((res:any)=>{
      let fileName = res.fileName;
      bookModel.imageUrl = fileName;

      let api = this.apiUrl + "books/update";
      this.httpClient.post(api, bookModel).subscribe((res:any)=>{
        this.spinner.hide();
        this.router.navigate(["/books"]);
        return true;
      },(err)=>{
        this.spinner.hide();
        this.errorService.errorHandler(err);
        return false;
      })
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
      return false;
    });
    return true;
  }

  updateModel(bookModel:BookModel, img:string){
    this.spinner.show();
    let api = this.apiUrl + "books/update";
    bookModel.imageUrl = img;
    this.httpClient.post(api,bookModel).subscribe((res)=>{
      this.spinner.hide();
      this.router.navigate(["/books"]);
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  getList(){
    let api = this.apiUrl + "books/getlist";
    return this.httpClient.get(api);
  }

  getBookRentCountList(){
    let api = this.apiUrl + "books/getBookRentCountList";
    return this.httpClient.get(api);
  }

  getByGuid(guid:string){
    let api = this.apiUrl + "books/getByGuid?guid=" + guid;
    return this.httpClient.get(api);
  }

  delete(bookModel:BookModel){
    let api = this.apiUrl + "books/delete";
    return this.httpClient.post(api,bookModel);
  }
}
