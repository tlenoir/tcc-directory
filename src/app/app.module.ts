import { FavoritePage } from './../pages/favorite/favorite';
import { HomePage } from './../pages/home/home';
import { FilterSkillPipe } from './../pipes/filter/filter';
import { GetBusinessesProvider } from './../providers/get-businesses/get-businesses';
import { GetSkillsProvider } from './../providers/get-skills/get-skills';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DetailsPage } from '../pages/details/details';
import { WelcomePage } from '../pages/welcome/welcome';

import { SQLite } from '@ionic-native/sqlite';
import { SMS } from '@ionic-native/sms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { GetBusinessesIdProvider } from '../providers/get-businesses-id/get-businesses-id';
import { FilterUniquePipe } from '../pipes/filter-unique/filter-unique';
import { FavoriteDataProvider } from '../providers/favorite-data/favorite-data';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [
    MyApp,
    DetailsPage,
    HomePage,
    WelcomePage,
    FilterSkillPipe,
    FilterUniquePipe,
    FavoritePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage,
    WelcomePage,
    HomePage,
    FavoritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SMS,
    InAppBrowser,
    Geolocation,
    GoogleMaps,
    CallNumber,
    GetSkillsProvider,
    GetBusinessesProvider,
    GetBusinessesIdProvider,
    FavoriteDataProvider
  ]
})
export class AppModule {}
