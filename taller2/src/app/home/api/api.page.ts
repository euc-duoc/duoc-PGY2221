import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
  standalone: false
})
export class ApiPage implements OnInit {

  constructor(private http: HttpClient) { }

  datosCovid: any = {};

  ngOnInit() {
    this.http.get(
      "https://disease.sh/v3/covid-19/all"
    )
    .subscribe({
      next: (res: any) => {
        this.datosCovid = res;
        console.log(this.datosCovid);
      }
    })
  }

}
