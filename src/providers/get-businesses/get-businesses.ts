import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetBusinessesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

import { RootObjectBusinesses } from "./../models/businesses";


const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'tccdirectory.1click.pf'
  })
};

@Injectable()
export class GetBusinessesProvider {

  urlBusinesses: string = 'http://tccdirectory.1click.pf/api/businesses';

  constructor(public http: HttpClient) {
    console.log('Hello GetBusinessesProvider Provider');
  }

  getBusinessesData() {
    return this.http.get<RootObjectBusinesses>(this.urlBusinesses, httpOptions );
    
      
}

}
