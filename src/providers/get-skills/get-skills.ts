import { Injectable } from '@angular/core';

/*
  Generated class for the GetSkillsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootObjectSkills } from "./../models/skills";

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'tccdirectory.1click.pf'
  })
};

@Injectable()
export class GetSkillsProvider {

   

  urlSkills: string = 'http://tccdirectory.1click.pf/api/skills';

  constructor(public http: HttpClient) {
    console.log('Hello GetSkillsProvider Provider');

    console.log(this.getSkillsData());
  }

  getSkillsData() {
    return this.http.get<RootObjectSkills>(this.urlSkills, httpOptions );
    
      
}

}
