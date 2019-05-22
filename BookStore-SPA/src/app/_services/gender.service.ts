import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../_models/Gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
    baseUrl = 'http://localhost:5000/api/';
    gender: Gender;
    formData: Gender;
    list: Gender[];
    listComplet: Gender[];

    constructor(private http: HttpClient) { }

    addGender(gender: Gender) {
        return this.http.post(this.baseUrl + 'Genders', gender);
    }

    updateGender(id: number, gender: Gender) {
        return this.http.put(this.baseUrl + 'genders/' + id, gender);
    }

    async getGenders() {
        await this.http.get(this.baseUrl + '/Genders')
        .toPromise()
        .then(res => this.list = res as Gender[]);
            this.listComplet = this.list;
    }

    deleteGender(id: number) {
        return this.http.delete(this.baseUrl + 'genders/' + id);
    }

    search(value) {
        this.list = this.listComplet.filter(
            gender => gender.description.toLowerCase().startsWith(value, 0));
    }

    getGenderById(id) {
        return this.http.get(this.baseUrl + 'genders/' + id)
        .toPromise()
        .then(res => this.formData = res as Gender);
    }
}