import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from '../books/model/bookModel';
import { LeaseTermsModel } from '../books/model/leaseTermsModel';
import { BookService } from '../books/service/book.service';
import { RentABookService } from '../books/service/rent-a-book.service';
import { ErrorService } from '../service/error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bookId:number = 0;
  books:BookModel[] = [];
  leaseTerms:LeaseTermsModel[] = [];
  filterText:string;
  name:string = "";
  tel:string = "";

  constructor(
    private bookService:BookService,
    private toastrService:ToastrService,
    private rentABookService:RentABookService,
    private spinner:NgxSpinnerService,
    private datePipe:DatePipe,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.getList();

  }

  getChart(obj:any[]){
    Chart.register(...registerables);
    let labelBooks: string[] = [];
    let dataBooks: number[] = [];
    let colorBooks: string[] = [];
    obj.forEach(element => {
      labelBooks.push(element.name.toString());
      dataBooks.push(+element.count);
      colorBooks.push(this.getRandomColor());
    });
    const data = {
      labels: labelBooks,
      datasets: [{
        label: 'Kitap Kiralama Chartı',
        data: dataBooks,
        backgroundColor: colorBooks
      }]
    };

    const config =  new Chart("myChart",{
      type: 'doughnut',
      data: data,
      options: {}
    });


  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
    }


  getList(){
    this.spinner.show();
    this.bookService.getList().subscribe((res:any)=>{
      this.spinner.hide();
      this.books = res.data;
      this.getBookRentCountList();
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

  getBookRentCountList(){
    this.spinner.show();
    this.bookService.getBookRentCountList().subscribe((res:any)=>{
      this.spinner.hide();
      this.getChart(res.data);
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

  rentABook(){
    if (this.name == "" || this.tel == "") {
      this.toastrService.error("Zorunlu alanları doldurun");
      return;
    }

    this.spinner.show();
    let date = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    let model = new LeaseTermsModel;
    model.bookId = this.bookId;
    model.landmanName = this.name;
    model.landmanTel = this.tel;
    model.rentDate = date;
    this.rentABookService.add(model).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastrService.success(res.message);
      this.name = "";
      this.tel = "";
      this.getList();
      document.getElementById("closeModal").click();
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

  returnBook(model:BookModel){
    this.spinner.show();
    this.rentABookService.returnBook(model).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastrService.info(res.message);
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

}
