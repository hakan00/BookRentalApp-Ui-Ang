import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from '../model/bookModel';
import { LeaseTermsModel } from '../model/leaseTermsModel';

@Injectable({
  providedIn: 'root'
})
export class RentABookService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  add(leaseTermsModel:LeaseTermsModel){
    let api = this.apiUrl + "LeaseTerms/add";
    return this.httpClient.post(api,leaseTermsModel);
  }

  returnBook(bookModel:BookModel){
    let api = this.apiUrl + "LeaseTerms/returnBook";
    return this.httpClient.post(api,bookModel);
  }

  getListByBook(bookId:number){
    let api = this.apiUrl + "LeaseTerms/getListByBook?bookId=" + bookId;
    return this.httpClient.get(api);
  }
}
