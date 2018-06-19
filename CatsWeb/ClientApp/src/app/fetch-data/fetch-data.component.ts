import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public cats: Cat[];
  public catValues: CatValue[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Cat[]>(baseUrl + 'api/Cats/Cats').subscribe(result => {
      this.cats = result;
    }, error => console.error(error));


    http.get<Cat[]>(baseUrl + 'api/Cats/CatValues').subscribe(result => {
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
