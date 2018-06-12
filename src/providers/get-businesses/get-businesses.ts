import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetBusinessesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

import { RootObjectBusinesses } from "./../models/businesses";
import { Fatum } from './../models/fatum';

@Injectable()
export class GetBusinessesProvider {

  urlBusinesses: string = 'http://tccdirectory.1click.pf/api/businesses?page=';

  template_businesses: Fatum[]
  businesses = [];
  pageTotal: number;
  Rootas = [];

  constructor(public http: HttpClient) {
    console.log('Hello GetBusinessesProvider Provider');
  }

  // return ALL data from ALL pages of businessesPage : 1 n 2 in our API
  getBusinessesData() {
    return new Promise(resolveBusinesses => {
      this.http.get<RootObjectBusinesses>(this.urlBusinesses)
      .subscribe(data => {
          this.pageTotal = data.last_page;
            for (let pushies = 0; pushies < this.pageTotal; pushies++) {
              this.Rootas[pushies] = pushies + 1;
              this.http.get<RootObjectBusinesses>(this.urlBusinesses + (pushies + 1))
                .subscribe(dataYA => {
                  this.template_businesses = dataYA.data;
    this.businesses = this.businesses.concat(this.template_businesses);

    if (pushies+1 == this.pageTotal) {
      resolveBusinesses(this.businesses)
    }
    console.log("businesses "+pushies, this.businesses);
                })
            }
      })
    })
    
  }


}
