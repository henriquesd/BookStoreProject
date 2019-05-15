import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookComponent } from './books/book/book.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'book', component: BookComponent },
    { path: 'book/:id', component: BookComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]