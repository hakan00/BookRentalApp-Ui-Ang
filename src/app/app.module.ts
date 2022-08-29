import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './ui/login/interceptors/auth.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [
    { provide: 'apiUrl', useValue:'https://webapi.angulareducation.com/api/'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
