import { Geolocation } from '@ionic-native/geolocation';
import { GetBusinessesIdProvider } from './../../providers/get-businesses-id/get-businesses-id';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SMS, SmsOptionsAndroid } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, Platform, Slides, ToastController, MenuController } from 'ionic-angular';
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, MarkerOptions, GoogleMapOptions, Marker, LatLng } from '@ionic-native/google-maps';



declare var google;


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  @ViewChild(Slides) slides: Slides;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  segment: string = "Detail";
  isRound: boolean = true;
  url: string;

  swipe: number = 0;

  //map: GoogleMap;
  mapHeight = 0;
  mapWidth = 0;
  detaildetailHeight =0;
  detailHeight = 0;
  transparentDetail = 0;
  topAvatar = 0;
  id;
  business: any;
  detailName: string;
  detailEmail: string;

  detailLogo: string;
  detailDescription: string;
  detailLat = 0;
  detailLng = 0;

  detaildescription: string;
  detailphone: string;
  detailmobile: string;
  detailwebsite_url: string;
  detailfacebook_url: string;
  detailtwitter_url: string;
  detaillinkedin_url: string;
  detailadresse: string;
  detailmonday_start: string;
  detailmonday_end: string;
  detailtuesday_start: string;
  detailtuesday_end: string;
  detailwednesday_start: string;
  detailwednesday_end: string;
  detailthursday_start: string;
  detailthursday_end: string;
  detailfriday_start: string;
  detailfriday_end: string;
  detailsaturday_start: string;
  detailsaturday_end: string;
  detailsunday_start: string;
  detailsunday_end: string;
  detailabus: string;
  detailcreated_at: string;
  detailupdated_at: string;
  detailskills: string;



  //optionSms: SmsOptionsAndroid; 

  constructor(private geolocation: Geolocation,
    public gbbid: GetBusinessesIdProvider,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private Platform: Platform,
    private call: CallNumber,
    private sms: SMS,
    private iab: InAppBrowser) {
    this.Platform.ready().then(() => {
      this.getBusiness();
      this.mapHeight = this.getWindowHeight();
      this.mapWidth = this.getWindowWidth(); 
      //this.geoloc();
      this.transparentDetail = (this.mapHeight * 0.2);
      this.detailHeight = (this.mapHeight * 0.8);
      this.detaildetailHeight =(this.mapHeight * 0.33)
      this.loadMap();
      

    })
  }

  
 
  loadMap(){

    //48.858578, 2.294405 Tour Eifel 
 
    let latLng = new google.maps.LatLng(this.detailLat, this.detailLng);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

  //Géolocalisation

/*   geoloc() {

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp.coords.latitude', resp.coords.latitude)
      console.log('resp.coords.longitude', resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      console.log('resp.coords.latitude', data)
      console.log('resp.coords.longitude', data)
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  } */

  getBusiness() {

    this.id = this.navParams.get('idal')
    this.gbbid.getBusinessById(this.id).subscribe(data => {
      console.log("getBusiness", data);
      this.business = data;
      this.detailName = this.business.name;
      this.detailEmail = this.business.email;
      this.detailphone = this.business.mobile;
      this.detailLogo = this.business.logo;
      this.detailLat = this.business.latitude;
      this.detailLng = this.business.longitude;
      this.detaildescription = this.business.description
      this.detailphone = this.business.phone
      this.detailmobile = this.business.mobile
      this.detailwebsite_url = this.business.website_url
      this.detailfacebook_url = this.business.facebook_url
      this.detailtwitter_url = this.business.twitter_url
      this.detaillinkedin_url = this.business.linkedin_url
      this.detailadresse = this.business.adresse
      this.detailmonday_start = this.business.monday_start
      this.detailmonday_end = this.business.monday_end
      this.detailtuesday_start = this.business.tuesday_start
      this.detailtuesday_end = this.business.tuesday_end
      this.detailwednesday_start = this.business.wednesday_start
      this.detailwednesday_end = this.business.wednesday_end
      this.detailthursday_start = this.business.thursday_start
      this.detailthursday_end = this.business.thursday_end
      this.detailfriday_start = this.business.friday_start
      this.detailfriday_end = this.business.friday_end
      this.detailsaturday_start = this.business.saturday_start
      this.detailsaturday_end = this.business.saturday_end
      this.detailsunday_start = this.business.sunday_start
      this.detailsunday_end = this.business.sunday_end
      this.detailabus = this.business.abus
      this.detailcreated_at = this.business.created_at
      this.detailupdated_at = this.business.updated_at

      console.log('business', this.business);


      // this.loadMap();
    })
  }

  // loadMap() {
  //   /*   let LatLngMarker = new GoogleMap. */
  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: this.detailLat,
  //         lng: this.detailLng
  //       },
  //       zoom: 20,
  //       tilt: 30
  //     }
  //   };

  //   this.map = GoogleMaps.create('map_canvas', mapOptions);

  //   let marker: Marker = this.map.addMarkerSync({
  //     title: 'Ionic',
  //     icon: 'blue',
  //     animation: 'DROP',
  //     position: {
  //       lat: this.detailLat,
  //       lng: this.detailLng
  //     }
  //   });
  //    marker.setPosition()
  //    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //      alert('clicked');
  //    });


  //    calcRoute() {
  //     current_pos = new GoogleMaps.LatLng(40.4,-78);
  //     end_pos = new GoogleMaps.LatLng(42.356,-78.5794);
  //     var request = {
  //        origin:current_pos,
  //        destination:end_pos,
  //        travelMode: GoogleMaps.TravelMode.DRIVING
  //     };
  //     directionsService.route(request, function(result, status) {
  //        if (status == google.maps.DirectionsStatus.OK) {
  //           directionsDisplay.setDirections(result);
  //        }
  //     });
  //  }
  // }




  openfb() {
    this.openWeb(this.detailfacebook_url);
  }
  opentwitter() {
    this.openWeb(this.detailtwitter_url);
  }
  openlinkInn() {
    this.openWeb(this.detaillinkedin_url);
  }
  openWebsite() {
    this.openWeb(this.detailwebsite_url);
  }

  // Bouton vers browser
  openWeb(url: string) {
    const option: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      enableViewportScale: 'yes',
    };

    this.iab.create(url, '_self', option);
  }

  //Bouton pour passer des Appels 
  Call() {
    this.call.callNumber(this.detailphone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //Bouton pour Envoyer des Messages 
  Sms(phoneNumber: string) {

    this.sms.send(phoneNumber, ''); // A voir Msg prédéfini 
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
