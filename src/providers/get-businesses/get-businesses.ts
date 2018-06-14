import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetBusinessesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//import { Fatum } from './../models/fatum';
import { RootObject } from "../models/businesses";

@Injectable()
export class GetBusinessesProvider {
  urlPostBusinesses: string = 'http://tccdirectory.1click.pf/api/search?skills=';
  templateBusinessesById = [];
  data : RootObject;
  getData ;
  lemot;

  constructor(public http: HttpClient) {
    console.log('Hello GetBusinessesProvider Provider');
  }

  getBusinessesDataById(bySkill: RootObject, id=[]){
    this.lemot = "";

    // buildFactory world as ' 8,13,6 ' for example
    for (var i = 0; i < id.length; i++) {
      var element = id[i];
      if (i+1 != id.length) {
        this.lemot = this.lemot+element+",";
      } else {
        this.lemot = this.lemot+element;
      }
      
    }
    return this.http.post(this.urlPostBusinesses+this.lemot, bySkill)
  }

}
