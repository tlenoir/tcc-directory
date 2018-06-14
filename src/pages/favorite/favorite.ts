import { DetailsPage } from './../details/details';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoriteDataProvider } from '../../providers/favorite-data/favorite-data';
import { RootObjectBusinessById } from '../../providers/models/businessById';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  favoriteData: RootObjectBusinessById[];

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
  private favoriteDataProvider: FavoriteDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  ionViewWillEnter() {
    this.initfavoriteData();
  }

  initfavoriteData() {
    this.favoriteDataProvider
      .getFavoriteDatas()
      .then(favs => (this.favoriteData = favs));
  }

  goToDetail(id: RootObjectBusinessById) {
    this.navCtrl.push(DetailsPage, id.id);
  }

}
