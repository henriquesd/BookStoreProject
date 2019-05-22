import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GenderService } from 'src/app/_services/gender.service';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.css']
})
export class GenderListComponent implements OnInit {
  genders: any;
  public searchTerm: string;
  listComplet: any;

  constructor(private http: HttpClient,
              private router: Router,
              private service: GenderService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  async getValues() {
    this.http.get('http://localhost:5000/api/genders').subscribe(response => {
      this.genders = response;
      this.listComplet = response;
    }, error => {
      this.alertify.error('An error occurred on get the records.');
    });
  }

  addGender() {
    this.router.navigate(['/gender']);
  }

  editGender(genderId: number) {
    this.router.navigate(['/gender/' + genderId]);
  }

  deleteGender(genderId: number) {
    this.alertify.confirm('Are you sure you want to delete this gender?', () => {
      this.service.deleteGender(genderId).subscribe(() => {
        this.alertify.success('The gender has been deleted');
        this.getValues();
      }, () => {
        this.alertify.error('Failed to delete the gender.');
      });
    });
  }

  search() {
    const value = this.searchTerm.toLowerCase();
    this.genders = this.listComplet.filter(
      gender => gender.description.toLowerCase().startsWith(value, 0));
  }

}
