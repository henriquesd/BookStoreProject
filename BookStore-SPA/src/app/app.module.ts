import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookService } from './_services/book.service';
import { BookComponent } from './books/book/book.component';
import { AlertifyService } from './_services/alertify.service';
import { GenderComponent } from './genders/gender/gender.component';
import { GenderListComponent } from './genders/gender-list/gender-list.component';
import { GenderService } from './_services/gender.service';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BookComponent,
      BookListComponent,
      HomeComponent,
      GenderComponent,
      GenderListComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AlertifyService,
      BookService,
      GenderService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
