import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    baseUrl = 'http://localhost:5000/api/';
    category: Category;
    formData: Category;
    list: Category[];
    listComplet: Category[];

    constructor(private http: HttpClient) { }

    addCategory(category: Category) {
        return this.http.post(this.baseUrl + 'Categories', category);
    }

    updateCategory(id: number, category: Category) {
        return this.http.put(this.baseUrl + 'categories/' + id, category);
    }

    async getCategorys() {
        await this.http.get(this.baseUrl + '/categories')
        .toPromise()
        .then(res => this.list = res as Category[]);
            this.listComplet = this.list;
    }

    deleteCategory(id: number) {
        return this.http.delete(this.baseUrl + 'categories/' + id);
    }

    search(value) {
        this.list = this.listComplet.filter(
            category => category.description.toLowerCase().startsWith(value, 0));
    }

    getCategoryById(id) {
        return this.http.get(this.baseUrl + 'categories/' + id)
        .toPromise()
        .then(res => this.formData = res as Category);
    }
}