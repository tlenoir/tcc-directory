import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  skipMsg: string = "Skip";
  cucumber: number = 0;
  database: SQLiteObject;


  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.initDb();


    })
  }
  initDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        console.log('create db good')
        this.createDirectoryTable();

      })
      .catch(e => console.log(e));
  }

  dropDirectorytable(): any {
    this.database.executeSql(' DROP TABLE directory', {})
      .then(() => {
        console.log('tabe directory dropped');
      })
      .catch(e => console.log(e));

  }

  createDirectoryTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS directory (Dont_show_again TEXT)', {})
      .then(() => {
        console.log('create table good');
        this.CheckDsa();

      })
      .catch(e => console.log(e));
  }

  CheckDsa() {
    this.database.executeSql('SELECT Dont_show_again FROM directory', {})
      .then((data) => {
        if (data.rows.length == 1) this.navCtrl.setRoot(HomePage);
        console.log('Dont_show_again', data.rows.length)
      })

  }


  updateCucumber() {

    if (this.cucumber == 0) this.cucumber++
    else this.cucumber--
    console.log('cucumber', this.cucumber)
  }

  skip() {
    this.skipMsg;

    if (this.cucumber == 1) {
      this.database.executeSql("INSERT INTO directory(Dont_show_again) VALUES ('1')", {})
        .then(() => {
          this.navCtrl.setRoot(HomePage);
          console.log('INSERT INTO directory(Dont_show_again) GOOD')

        })
    }
    else this.navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');

  }
}