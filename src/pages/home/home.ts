import { Component } from '@angular/core';

import { Platform } from "ionic-angular";
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
  data_businesses_fatum: Fatum[];

  skills = [];
  

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

      console.log("skills: ", this.skills);
    });

    this.gbp.getBusinessesData().subscribe(data => {
      this.data_businesses = data;
      this.data_businesses_fatum = this.data_businesses.data;

      console.log("businessesFatum: ", this.data_businesses_fatum);
    });

  }
  

  


  // ================================================


  // Data Object to List Skills

  // Getting Selected Skills and Count
  getSelected() {
    this.selected_skills = this.skills.filter(s => {
      return s.selected;

      
    });
    console.log(this.selected_skills);
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
