import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetBusinessesIdProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetBusinessesIdProvider {

  url: string = 'http://tccdirectory.1click.pf/api/business/'

  constructor(public http: HttpClient) {
    console.log('Hello GetBusinessesIdProvider Provider');
  }

  getBusinessById(id){
    return this.http.get(this.url+id);
  }

}
