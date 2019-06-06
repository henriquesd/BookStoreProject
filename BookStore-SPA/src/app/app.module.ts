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
import { CategoryComponent } from './categories/category/category.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryService } from './_services/category.service';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BookComponent,
      BookListComponent,
      HomeComponent,
      CategoryComponent,
      CategoryListComponent
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
      CategoryService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
