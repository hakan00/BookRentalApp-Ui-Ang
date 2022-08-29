import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookUpdateComponent } from './book-update.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BookUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component:BookUpdateComponent}
    ])
  ],
  exports: [
    BookUpdateComponent
  ]
})
export class BookUpdateModule { }
