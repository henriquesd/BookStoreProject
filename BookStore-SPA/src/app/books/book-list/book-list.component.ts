import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any;
  public searchTerm: string;
  listComplet: any;

  constructor(private http: HttpClient,
              private router: Router,
              private service: BookService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  async getValues() {
    this.http.get('http://localhost:5000/api/books').subscribe(response => {
      this.books = response;
      this.listComplet = response;
    }, error => {
      this.alertify.error('An error occurred on get the records.');
    });
  }

  addBook() {
    this.router.navigate(['/book']);
  }

  editBook(bookId: number) {
    this.router.navigate(['/book/' + bookId]);
  }

  deleteBook(bookId: number) {
    this.alertify.confirm('Are you sure you want to delete this book?', () => {
      this.service.deleteBook(bookId).subscribe(() => {
        this.alertify.success('The book has been deleted');
        this.getValues();
      }, () => {
        this.alertify.error('Failed to delete the book.');
      });
    });
  }

  search() {
    const value = this.searchTerm.toLowerCase();
    this.books = this.listComplet.filter(
      book => book.name.toLowerCase().startsWith(value, 0) ||
      book.author.toLowerCase().startsWith(value, 0) ||
      book.description.toString().startsWith(value, 0) ||
      book.value.toString().startsWith(value, 0) ||
      book.publishDate.toString().startsWith(value, 0));
  }
}
