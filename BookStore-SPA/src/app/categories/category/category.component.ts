import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/_models/Category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category;
  bsConfig: Partial<BsDatepickerConfig>;
  formData: Category;
  categories: any;

  constructor(public service: CategoryService,
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
      this.service.getCategoryById(id).catch(() => {
        this.alertify.error('An error occurred on get the record.');
      });
    } else {
      this.resetForm();
    }

    this.http.get('http://localhost:5000/api/categories').subscribe(response => {
      this.categories = response;
    }, () => {
      this.alertify.error('An error occurred on get the records.');
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.service.formData = {
      id: 0,
      description: ''
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
    this.service.addCategory(form.form.value).subscribe(() => {
      this.alertify.success('Registration successful');
      this.resetForm(form);
      this.router.navigate(['/categories']);
    }, () => {
      this.alertify.error('An error occurred on insert the record.');
    });
  }

  updateRecord(form: NgForm) {
    this.service.updateCategory(form.form.value.id, form.form.value).subscribe(() => {
      this.alertify.success('Updated successful');
      this.resetForm(form);
      this.router.navigate(['/categories']);
    }, () => {
      this.alertify.error('An error occurred on update the record.');
    });
  }

  cancel() {
    this.router.navigate(['/categories']);
  }

}
