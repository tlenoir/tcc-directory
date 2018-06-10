import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string;
  searchText: string = "";
  selected_count: number = 0;
  selected_games;


  // Data Object to List Games
  games = [
    {
      name: 'Favoris',
      id: 1,
      selected: true
    },
    {
      name: 'PHP',
      id: 2,
      selected: false
    },
    {
      name: 'HTML',
      id: 3,
      selected: false
    },
    {
      name: 'Java',
      id: 4,
      selected: false
    },
    {
      name: 'Firebase',
      id: 5,
      selected: false
    },
    {
      name: 'Ionic',
      id: 6,
      selected: true
    },
    {
      name: 'React',
      id: 7,
      selected: false
    }
  ]

  // Getting Selected Games and Count
  getSelected() {
    this.selected_games = this.games.filter(s => {
      return s.selected;
    });
    this.selected_count = this.selected_games.length;
    //alert(this.selected_games);    
  }

  // Clearing All Selections
  clearSelection() {
    this.searchText = "";
    this.games = this.games.filter(g => {
      g.selected = false;
      return true;
    });
    this.getSelected();
  }

  //Delete Single Listed Game Tag
  deleteGame(id: number) {
    this.searchText = "";
    this.games = this.games.filter(g => {
      if (g.id == id)
        g.selected = false;

      return true;
    });
    this.getSelected();
  }

  //Clear term types by user
  clearFilter() {
    this.searchText = "";
  }

  constructor() {
    this.getSelected();
  }
}