import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { BooksModule } from './books/books.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NotFoundModule } from './not-found/not-found.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    BrowserAnimationsModule,
    BooksModule,
    NotFoundModule
  ],
  exports: [
    HomeModule,
    BooksModule,
    NotFoundModule
  ]
})
export class ComponentsModule { }
