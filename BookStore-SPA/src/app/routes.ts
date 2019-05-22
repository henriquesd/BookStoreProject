import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookComponent } from './books/book/book.component';
import { GenderComponent } from './genders/gender/gender.component';
import { GenderListComponent } from './genders/gender-list/gender-list.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'book', component: BookComponent },
    { path: 'book/:id', component: BookComponent },
    { path: 'genders', component: GenderListComponent },
    { path: 'gender', component: GenderComponent },
    { path: 'gender/:id', component: GenderComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]