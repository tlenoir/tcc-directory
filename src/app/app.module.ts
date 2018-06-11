import { HomePage } from './../pages/home/home';
import { FilterPipe } from './../pipes/filter/filter';
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
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { HttpClientModule } from '@angular/common/http';
import { GetSkillsProvider } from '../providers/get-skills/get-skills';
import { GetBusinessesProvider } from '../providers/get-businesses/get-businesses';


@NgModule({
  declarations: [
    MyApp,
    DetailsPage,
    WelcomePage,
    HomePage,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage,
    WelcomePage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SMS,
    InAppBrowser,
    Geolocation,
    CallNumber,
    GetSkillsProvider,
    GetBusinessesProvider
  ]
})
export class AppModule {}
