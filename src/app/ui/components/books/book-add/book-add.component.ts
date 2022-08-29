import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../service/error.service';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  addForm: FormGroup;
  file:any;
  formData:any;
  currentImage:string = "";

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private bookService:BookService,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      id: [0],
      name: ["", [Validators.required, Validators.minLength(3)]],
      writer: ["", [Validators.required, Validators.minLength(3)]],
      publishDate: ["", [Validators.required]],
      isActive: [true],
      isAvailable: [true],
      imageUrl: ["", [Validators.required]],
      guid: ["guid"],
    });
  }

  add(){
    if (this.addForm.valid) {
      let result = this.bookService.add(this.formData,this.addForm.value);
      console.log(result);
      if (result) {
        this.addForm.reset();
        this.currentImage = "";
        this.file = undefined;
        this.formData = undefined;
      }
    }else{
      this.toastr.error("Zorunlu alanları doldurun");
    }
  }

  setImage(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (this.file.size > 5000000) {
        this.toastr.warning("Dosya boyutu 5MB'dan fazla olamaz");
        this.addForm.controls["imageUrl"].setValue("");
        return;
      }

      var reader = new FileReader();
      reader.onload = (event:any)=>{
        this.currentImage = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      this.formData = new FormData;
      this.formData.append("file",this.file,this.file.name)
      console.log(this.file);
    }
  }

}
