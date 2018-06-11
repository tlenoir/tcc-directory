import { Component } from '@angular/core';

import { Platform } from "ionic-angular";
import { Response, Http } from '@angular/http';
import { GetSkillsProvider } from './../../providers/get-skills/get-skills';
import { GetBusinessesProvider } from './../../providers/get-businesses/get-businesses';
import { RootObjectSkills } from '../../providers/models/skills';
import { RootObjectBusinesses } from '../../providers/models/businesses';
import { Fatum } from '../../providers/models/fatum';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name: string;
  searchSkill: string = "";

  // getSkills ya
  data_skills: RootObjectSkills;
  data_businesses: RootObjectBusinesses;
  skills = [];
  businesses: Fatum[];
  businesses_skills: Fatum;
  

  // selected_count use to '*ngIF' => "SHOW_SKILL"
  selected_count: number = 0;
  selected_skills;

  constructor(public platform: Platform,
  private gsp: GetSkillsProvider,
private gbp: GetBusinessesProvider) {

    platform.ready().then(() => {
      this.getData();
      this.getSelected();

    });
    
  }

  // ================================================

  getData(){
    this.gsp.getSkillsData().subscribe(data => {
      this.data_skills = data;
      this.skills = this.data_skills.data;
    });

    this.gbp.getBusinessesData().subscribe(data => {
      this.data_businesses = data;
      this.businesses = this.data_businesses.data;

      for (let baby = 0; baby < this.businesses.length; baby++) {
        const element = this.businesses[baby];

        console.log(element.skills);
      
        
      }
      

      console.log(this.businesses);
    });

  }

  


  // ================================================


  // Data Object to List Skills

  // Getting Selected Skills and Count
  getSelected() {
    this.selected_skills = this.skills.filter(s => {
      return s.selected;
    });
    this.selected_count = this.selected_skills.length;
    //alert(this.selected_skills);    
  }

  // Clearing All Selections
  clearSelection() {
    this.searchSkill = "";
    this.skills = this.skills.filter(g => {
      g.selected = false;
      return true;
    });
    this.getSelected();
  }

  //Delete Single Listed Skill Tag
  deleteSkill(id: number) {
    this.searchSkill = "";
    this.skills = this.skills.filter(g => {
      if (g.id == id)
        g.selected = false;

      return true;
    });
    this.getSelected();
  }

  //Clear Render Skill by X-user
  clearFilter() {
    this.searchSkill = "";
  }
}
