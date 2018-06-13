import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  next() {
    this.navCtrl.push(DetailsPage)

  }

  mappage(){
    this.navCtrl.push(WelcomePage)



  }

}
