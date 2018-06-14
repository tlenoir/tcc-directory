import { RootObject } from './../../providers/modeles/businesses';
import { DetailsPage } from './../details/details';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';


import { Platform } from "ionic-angular";
import { GetSkillsProvider } from './../../providers/get-skills/get-skills';
import { GetBusinessesProvider } from './../../providers/get-businesses/get-businesses';


// this is the INTERFACE type of data from API : call MODELS
//import { RootObjectBusinesses } from './../../providers/models/businesses';
import { RootObjectSkills } from '../../providers/models/skills';
import { Fatum } from '../../providers/models/fatum';
import { Galum } from './../../providers/models/galum';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // normalize variable
  name: string;
  fav;
  isTrueSelected_skills: number;
  idToGetSkills = [];
  templateGetBusinesses: RootObject;
  searchSkill: string = "";

  // selected_count use to '*ngIF' => "SHOW_SKILL"
  selected_count: number = 0;

  // variable use to stock skills information
  data_skills: RootObjectSkills;
  selected_skills;
  skills = [];

  // vartiable usse to stock businesses info
  // selected_businesses: Fatum[];
  // data_businesses: Fatum[];
  selected_businessesRoot;


  constructor(public platform: Platform,
    private gsp: GetSkillsProvider,
    private gbp: GetBusinessesProvider,
    public http: HttpClient,
    public navCtrl: NavController) {

    platform.ready().then(() => {
    
      this.getData();
      this.getSelectedData();

    });

  }

  // ================================================

  // hum... GET_ALL(data) from API

  getData() {
    this.gsp.getSkillsData().subscribe(data => {
      this.data_skills = data;
      this.skills = this.data_skills.data;

    })
  }
  // ================================================

  // Getting Selected Skills, Selected Buisinesses and 'Count to decide SHOW or NOT'
  getSelectedData() {
    this.selected_skills = this.skills.filter(s => {
      return s.selected;
    })

    this.idToGetSkills = []
    for (var i = 0; i < this.selected_skills.length; i++) {
      var element: Galum = this.selected_skills[i];
      var template = element.selected;
      if (template) {
        this.idToGetSkills = this.idToGetSkills.concat(element.id)
      }
    }
    this.gbp.getBusinessesDataById(this.templateGetBusinesses, this.idToGetSkills)
      .subscribe( dataBusinesses => {
        this.selected_businessesRoot = dataBusinesses;
      })
   
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
    this.getSelectedData();
  }

  //Delete Single Listed Skill Tag
  deleteSkill(id: number) {
    this.searchSkill = "";
    this.skills = this.skills.filter(g => {
      if (g.id == id)
        g.selected = false;

      return true;
    });
    this.getSelectedData();
  }

  //Clear Render Skill by X-user
  clearFilter() {
    this.searchSkill = "";
  }

  // goTo Details Page with ID of businesses'man
  toDetailsPage(id) {

    this.navCtrl.push(DetailsPage, { idal: id });

  }

  // favoris button
  favoris(){

    if (this.fav == false) {

      this.fav = true
      
    } else {
      this.fav = false
    }
  }
}