import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAddComponent } from './book-add.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component:BookAddComponent}
    ])
  ],
  exports: [
    BookAddComponent
  ]
})
export class BookAddModule { }
