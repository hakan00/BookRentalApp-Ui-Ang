import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookFilterHomePipe } from './pipe/book-filter-home.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    HomeComponent,
    BookFilterHomePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(
      [
        {path: '', component:HomeComponent}
      ]
    )
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
