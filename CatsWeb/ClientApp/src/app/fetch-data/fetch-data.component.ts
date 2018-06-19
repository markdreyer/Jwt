import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public cats: Cat[];
  public catValues: CatValue[];

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }

  ngOnInit() {
    this.http.get<Cat[]>(this.baseUrl + 'api/Cats/Cats').subscribe(result => {
      this.cats = result;
    }, error => console.error(error));

    this.http.get<Cat[]>(this.baseUrl + 'api/Cats/CatValues').subscribe(result => {
      this.catValues = result;
    }, error => console.error(error));
  }

  GetCatValue = (name: string): number => this.catValues.find(x => x.name === name).value;

  GetNetWorth = (): number => this.catValues.reduce((accu, curr) => accu + curr.value, 0);

}

interface Cat {
  name: string;
  date: string;
  age: number;
  value: number;
}
interface CatValue {
  name: string;
  value: number;
}
