import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookComponent } from './books/book/book.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryComponent } from './categories/category/category.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'book', component: BookComponent },
    { path: 'book/:id', component: BookComponent },
    { path: 'categories', component: CategoryListComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]