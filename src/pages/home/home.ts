import { DetailsPage } from './../details/details';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';


import { Platform } from "ionic-angular";
import { GetSkillsProvider } from './../../providers/get-skills/get-skills';
import { GetBusinessesProvider } from './../../providers/get-businesses/get-businesses';


// this is the INTERFACE type of data from API : call MODELS
import { RootObjectBusinesses } from './../../providers/models/businesses';
import { RootObjectSkills } from '../../providers/models/skills';
import { Fatum } from '../../providers/models/fatum';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // normalize variable
  name: string;
  searchSkill: string = "";
  urlBusinesses: string = 'http://tccdirectory.1click.pf/api/businesses';
  TotalBusinessesMan: number;
  // selected_count use to '*ngIF' => "SHOW_SKILL"
  selected_count: number = 0;

  // variable use to stock skills information
  data_skills: RootObjectSkills;
  selected_skills;
  skills = [];

  // vartiable usse to stock businesses info
  selected_businesses: Fatum[];
  data_businesses: Fatum[];
  selected_businessesRoot = [];


  constructor(public platform: Platform,
    private gsp: GetSkillsProvider,
    private gbp: GetBusinessesProvider,
    public http: HttpClient,
    public navCtrl: NavController) {

    platform.ready().then(() => {
      
      // from API, get Total of Businesses'Man
      this.http.get<RootObjectBusinesses>(this.urlBusinesses)
        .subscribe(data => {
          this.TotalBusinessesMan = data.total;
        })
      this.getData();
      this.getSelectedSkills();

    });

  }

  // ================================================

  // hum... GET_ALL(data) from API

  getData() {
    this.gsp.getSkillsData().subscribe(data => {
      this.data_skills = data;
      this.skills = this.data_skills.data;
    })
    this.gbp.getBusinessesData().then(data => {
      this.data_businesses = data;

    })
  }
  // ================================================

  // Getting Selected Skills, Selected Buisinesses and 'Count to decide SHOW or NOT'
  getSelectedSkills() {

    this.selected_skills = this.skills.filter(s => {
      return s.selected;


    })
    this.selected_businesses = []
    for (let i = 0; i < this.TotalBusinessesMan; i++) {
      const element1 = this.data_businesses[i];
      const element2 = element1.skills;
      for (let e = 0; e < element2.length; e++) {
        const element3 = element2[e];
        const element4 = element3.id;
        for (let a = 0; a < this.selected_skills.length; a++) {
          const element5 = this.selected_skills[a];
          const element6 = element5.id;

          if (element4 == element6) {

            this.selected_businesses = this.selected_businesses.concat(element1);
            break;

          }

        }

      }

    }
    this.selected_businessesRoot = []
    for (let i = 0; i < this.selected_businesses.length; i++) {
      const element1 = this.selected_businesses[i];
      const template = element1.name;
      for (let e = 0; e < this.selected_businesses.length; e++) {
        const element2 = this.selected_businesses[e];
        const template2 = element2.name;

        if (template != template2) {

          this.selected_businessesRoot = this.selected_businessesRoot.concat(element1);
          break;

        } else break;

      }

    }
    this.selected_count = this.selected_skills.length;
    //if selected_count isworth 0 then 'DONT SHOW LIST_of_businesses_man'
    //alert(this.selected_skills);
  }

  // Clearing All Selections
  clearSelection() {
    this.searchSkill = "";
    this.skills = this.skills.filter(g => {
      g.selected = false;
      return true;
    });
    this.getSelectedSkills();
  }

  //Delete Single Listed Skill Tag
  deleteSkill(id: number) {
    this.searchSkill = "";
    this.skills = this.skills.filter(g => {
      if (g.id == id)
        g.selected = false;

      return true;
    });
    this.getSelectedSkills();
  }

  //Clear Render Skill by X-user
  clearFilter() {
    this.searchSkill = "";
  }

  // goTo Details Page with ID of businesses'man
  toDetailsPage(id) {

    this.navCtrl.push(DetailsPage, { idal: id });

  }
}