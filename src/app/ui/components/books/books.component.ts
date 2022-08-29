import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '../service/error.service';
import { BookModel } from './model/bookModel';
import { LeaseTermsModel } from './model/leaseTermsModel';
import { BookService } from './service/book.service';
import { RentABookService } from './service/rent-a-book.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books:BookModel[] = [];
  leaseTerms:LeaseTermsModel[] = []
  filterText:string;

  constructor(
    private bookService:BookService,
    private spinner:NgxSpinnerService,
    private rentABookService:RentABookService,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.spinner.show();
    this.bookService.getList().subscribe((res:any)=>{
      this.spinner.hide();
      this.books = res.data;
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

  deleteBook(bookModel:BookModel){
    this.spinner.show();
    this.bookService.delete(bookModel).subscribe((res:any)=>{
      this.spinner.hide();
      this.getList();
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

  getListByBook(bookId:number){
    this.spinner.show();
    this.rentABookService.getListByBook(bookId).subscribe((res:any)=>{
      this.spinner.hide();
      this.leaseTerms = res.data;
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

  exportExcel(){
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'Sayfa1');

    let title = "Kitaplar.xlsx";
    XLSX.writeFile(wb, title);
  }


}
