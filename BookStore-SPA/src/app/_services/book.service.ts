import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../_models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
    baseUrl = 'http://localhost:5000/api/';
    book: Book;
    formData: Book;
    list: Book[];
    listComplet: Book[];

    constructor(private http: HttpClient) { }

    addBook(book: Book) {
        return this.http.post(this.baseUrl + 'Books', book);
    }

    updateBook(id: number, book: Book) {
        return this.http.put(this.baseUrl + 'books/' + id, book);
    }

    async getBooks() {
        await this.http.get(this.baseUrl + '/Books')
        .toPromise()
        .then(res => this.list = res as Book[]);
            this.listComplet = this.list;
    }

    deleteBook(id: number) {
        return this.http.delete(this.baseUrl + 'books/' + id);
    }

    search(value) {
        this.list = this.listComplet.filter(
            book => book.name.toLowerCase().startsWith(value, 0) ||
            book.author.toLowerCase().startsWith(value, 0) ||
            book.description.toString().startsWith(value, 0) ||
            book.value.toString().startsWith(value, 0) ||
            book.publishDate.toString().startsWith(value, 0));
    }

    getBookById(id) {
        return this.http.get(this.baseUrl + 'books/' + id)
        .toPromise()
        .then(res => this.formData = res as Book);
    }
}