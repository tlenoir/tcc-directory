import { DetailsPage } from './../details/details';
import { RootObjectBusinesses } from './../../providers/models/businesses';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';


import { Platform } from "ionic-angular";
import { GetSkillsProvider } from './../../providers/get-skills/get-skills';
import { GetBusinessesProvider } from './../../providers/get-businesses/get-businesses';
import { RootObjectSkills } from '../../providers/models/skills';
import { Fatum } from '../../providers/models/fatum';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name: string;
  searchSkill: string = "";
  urlBusinesses: string = 'http://tccdirectory.1click.pf/api/businesses';
  TotalBusinessesMan: number;

  // getSkills ya
  data_skills: RootObjectSkills;
  data_businessesALLO: Fatum[];
  skills = [];


  // selected_count use to '*ngIF' => "SHOW_SKILL"
  selected_count: number = 0;
  selected_skills;
  selected_businesses: Fatum[];
  selected_businessesRoot = [];
  skills_template;
  skills_template2;


  constructor(public platform: Platform,
    private gsp: GetSkillsProvider,
    private gbp: GetBusinessesProvider,
  public http: HttpClient,
public navCtrl: NavController) {

    platform.ready().then(() => {
      this.http.get<RootObjectBusinesses>(this.urlBusinesses)
      .subscribe(data => {
          this.TotalBusinessesMan = data.total;
      })
      this.getData();
      this.getSelectedSkills();

    });

  }

  // ================================================

  getData() {
    this.gsp.getSkillsData().subscribe(data => {
      this.data_skills = data;
      this.skills = this.data_skills.data;
    })
    this.gbp.getBusinessesData().then(data => {
      this.data_businessesALLO = data;

    })
  }





  // ================================================

  // Getting Selected Skills and Count
  getSelectedSkills() {
    
    this.selected_skills = this.skills.filter(s => {
      return s.selected;


    })
    this.selected_businesses = []
    for (let i = 0; i < this.TotalBusinessesMan; i++) {
      const element1 = this.data_businessesALLO[i];
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
      for (let e = 1; e < this.selected_businesses.length; e++) {
        const element2 = this.selected_businesses[e];
        const template2 = element2.name;

        if (template != template2) {

          this.selected_businessesRoot = this.selected_businessesRoot.concat(element1);
          break;
          
        } else break;
        
      }
      
    }
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

  toDetailsPage(id){

    this.navCtrl.push(DetailsPage, {idal:id});
    
  }
}