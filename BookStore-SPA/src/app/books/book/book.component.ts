import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/_models/Book';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book;
  bsConfig: Partial<BsDatepickerConfig>;
  formData: Book;
  categories: any;

  constructor(public service: BookService,
              private router: Router,
              private route: ActivatedRoute,
              private alertify: AlertifyService,
              private http: HttpClient) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD-MM-YYYY'
    };

    this.resetForm();

    let id;
    this.route.params.subscribe(params => {
        id = params['id'];
    });

    if (id != null) {
      this.service.getBookById(id).catch(err => {
        this.alertify.error('An error occurred on get the record.');
      });
    } else {
      this.resetForm();
    }

    this.http.get('http://localhost:5000/api/categories').subscribe(response => {
      this.categories = response;
    }, error => {
      this.alertify.error('An error occurred on get the records.');
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.service.formData = {
      id: 0,
      name: '',
      author: '',
      description: '',
      value: null,
      publishDate: null,
      categoryId: null
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.addBook(form.form.value).subscribe(() => {
      this.alertify.success('Registration successful');
      this.resetForm(form);
      this.router.navigate(['/books']);
    }, error => {
      this.alertify.error('An error occurred on insert the record.');
    });
  }

  updateRecord(form: NgForm) {
    this.service.updateBook(form.form.value.id, form.form.value).subscribe(() => {
      this.alertify.success('Updated successful');
      this.resetForm(form);
      this.router.navigate(['/books']);
    }, error => {
      this.alertify.error('An error occurred on update the record.');
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }

}
