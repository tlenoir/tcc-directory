import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SMS, SmsOptionsAndroid } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Slides, ToastController, MenuController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, MarkerOptions, GoogleMapOptions, Marker, LatLng, } from '@ionic-native/google-maps';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  @ViewChild(Slides) slides: Slides;

  segment: string = "Detail";
  isRound: boolean = true;
  urlWebSite: string = "https://apeahi.github.io/tcc/";
  urlFacebook: string = "https://www.facebook.com/";
  urlTwitter: string = "https://twitter.com/";
  urlLinkinn: string = "https://www.linkedin.com/";

  swipe: number = 0;

  map: GoogleMap;
  mapHeight = 0;
  mapWidth = 0;
  detailHeight = 0;
  transparentDetail = 0; 
  topAvatar = 0 ; 


  //optionSms: SmsOptionsAndroid; 

  constructor(public menuCtrl: MenuController, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private Platform: Platform, private call: CallNumber, private sms: SMS, private iab: InAppBrowser, private googleMaps: GoogleMaps) {
    this.Platform.ready().then(() => {
      this.loadMap();
      this.mapHeight = this.getWindowHeight();
      this.mapWidth = this.getWindowWidth();7
      this.transparentDetail = (this.mapHeight * 0.2);
      this.detailHeight = (this.mapHeight * 0.8);

      console.log('detailHeight', this.detailHeight);
      console.log('detailHeight', this.mapHeight);

    })
  }

  tapEvent(e) {
    console.log('tapEvent Good');
  }

  swipeEvent(e) {
    console.log('swipe Good');
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -17.573142,
          lng: -149.607979
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: -17.573142,
        lng: -149.607979
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }


  // Bouton vers les réseaux sociaux Facebook Twitter Site Web 
  openWebsite(url: string) {
    url = this.urlWebSite

    const option: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      enableViewportScale: 'yes',
    };

    this.iab.create(url, '_self', option);

  }
  openFacebook(url: string) {
    url = this.urlFacebook

    const option: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      enableViewportScale: 'yes',
    };

    this.iab.create(url, '_self', option);

  }
  openTwitter(url: string) {
    url = this.urlTwitter

    const option: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      enableViewportScale: 'yes',
    };

    this.iab.create(url, '_self', option);

  }
  openLinkInn(url: string) {
    url = this.urlLinkinn

    const option: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      enableViewportScale: 'yes',
    };

    this.iab.create(url, '_self', option);

  }

  next() {

  }


  //Bouton pour passer des Appels 
  Call() {
    this.call.callNumber("+68987708537", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //Bouton pour Envoyer des Messages 
  Sms(optionSms: SmsOptionsAndroid) {

    this.sms.send('+68987708537', 'Hello Word'); // A voir Msg prédéfini 
  }



  //Récupère les Dimentions de l'écran de l'utilisateur 
  getWindowHeight() {
    var windowHeight = 0;
    if (typeof (window.innerHeight) == 'number') {
      windowHeight = window.innerHeight;
      console.log('window.innerHeight', windowHeight);
    } else {
      if (document.documentElement && document.documentElement.clientHeight) {
        windowHeight = document.documentElement.clientHeight;
        console.log(' document.documentElement.clientHeight', windowHeight)
      } else {
        if (document.body && document.body.clientHeight) {
          windowHeight = document.body.clientHeight;
          console.log(' document.body.clientHeight ', windowHeight)
        }
      }
    }
    return windowHeight;
  }
  getWindowWidth() {
    var windowWidth = 0;
    if (typeof (window.innerWidth) == 'number') {
      windowWidth = window.innerWidth;
      console.log('window.innerWidth;', windowWidth);
    }
    else {
      if (document.documentElement && document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
        console.log('document.documentElement.clientWidth;;', windowWidth);
      }
      else {
        if (document.body && document.body.clientWidth) {
          windowWidth = document.body.clientWidth;
          console.log('document.body.clientWidth;', windowWidth);
        }
      }
    }
    return windowWidth;
  }




}
