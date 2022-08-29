import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule, Routes } from '@angular/router';
import { BookAddModule } from './book-add/book-add.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { BookFilterPipe } from './pipe/book-filter.pipe';

const routes: Routes = [
  { path: '', component: BooksComponent}
]

@NgModule({
  declarations: [
    BooksComponent,
    BookFilterPipe
  ],
  imports: [
    CommonModule,
    BookAddModule,
    FormsModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
  ],
  exports: [
    BooksComponent
  ]
})
export class BooksModule { }
