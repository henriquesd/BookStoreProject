import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any;
  public searchTerm: string;
  listComplet: any;

  constructor(private http: HttpClient,
              private router: Router,
              private service: CategoryService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  async getValues() {
    this.http.get('http://localhost:5000/api/categories').subscribe(response => {
      this.categories = response;
      this.listComplet = response;
    }, error => {
      this.alertify.error('An error occurred on get the records.');
    });
  }

  addCategory() {
    this.router.navigate(['/category']);
  }

  editCategory(categoryId: number) {
    this.router.navigate(['/category/' + categoryId]);
  }

  deleteCategory(categoryId: number) {
    this.alertify.confirm('Are you sure you want to delete this category?', () => {
      this.service.deleteCategory(categoryId).subscribe(() => {
        this.alertify.success('The category has been deleted');
        this.getValues();
      }, () => {
        this.alertify.error('Failed to delete the category.');
      });
    });
  }

  search() {
    const value = this.searchTerm.toLowerCase();
    this.categories = this.listComplet.filter(
      category => category.description.toLowerCase().startsWith(value, 0));
  }

}
