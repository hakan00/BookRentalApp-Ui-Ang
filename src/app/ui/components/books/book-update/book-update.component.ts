import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../service/error.service';
import { BookModel } from '../model/bookModel';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {

  bookModel:BookModel;
  updateForm: FormGroup;
  file:any;
  formData:any;
  currentImage:string = "";

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private bookService:BookService,
    private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService,
    private datePipe:DatePipe,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.getByGuid(res.value);
    })
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      name: ["", [Validators.required, Validators.minLength(3)]],
      writer: ["", [Validators.required, Validators.minLength(3)]],
      publishDate: ["", [Validators.required]],
      isActive: [true],
      isAvailable: [true],
      imageUrl: [""],
      guid: ["guid"],
    });
  }

  getByGuid(guid:string){
    this.spinner.show();
    this.bookService.getByGuid(guid).subscribe((res:any)=>{
      this.spinner.hide();
      this.bookModel = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["writer"].setValue(res.data.writer);
      //
       this.updateForm.controls["isActive"].setValue(res.data.isActive);
       this.updateForm.controls["isAvailable"].setValue(res.data.isAvailable);
      // this.updateForm.controls["imageUrl"].setValue(res.data.imageUrl);
       this.updateForm.controls["guid"].setValue(res.data.guid);
       this.currentImage = "https://bookshopping.angulareducation.com/assets/img/" + res.data.imageUrl;
      let date = this.datePipe.transform(res.data.publishDate,'yyyy-MM-dd')
      this.updateForm.controls["publishDate"].setValue(date);

    },(err)=>{
      this.errorService.errorHandler(err);
      this.spinner.hide();
    })
  }

  update(){
    if (this.updateForm.valid) {
      if (this.formData == undefined) {
        this.bookService.updateModel(this.updateForm.value, this.bookModel.imageUrl);
      }
      this.bookService.updateImageAndModel(this.formData,this.updateForm.value);
    }else{
      this.toastr.error("Zorunlu alanları doldurun");
    }
  }

  setImage(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (this.file.size > 5000000) {
        this.toastr.warning("Dosya boyutu 5MB'dan fazla olamaz");
        this.updateForm.controls["imageUrl"].setValue("");
        return;
      }

      var reader = new FileReader();
      reader.onload = (event:any)=>{
        this.currentImage = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      this.formData = new FormData;
      this.formData.append("file",this.file,this.file.name)
    }
  }

}
