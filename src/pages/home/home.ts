import { Component } from '@angular/core'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name: string;
  searchText: string = "";

  // selected_count use to '*ngIF' => "SHOW_SKILL"
  selected_count: number = 0;
  selected_skills;

  constructor() {
    this.getSelected();
  }


  // Data Object to List Skills
  skills = [
    {
      name: 'PHP',
      id: 1,
      selected: true
    },
    {
      name: 'JavaScript',
      id: 2,
      selected: false
    },
    {
      name: 'Java',
      id: 3,
      selected: false
    },
    {
      name: 'HTML',
      id: 4,
      selected: false
    },
    {
      name: 'Ionic',
      id: 5,
      selected: false
    },
    {
      name: 'React',
      id: 6,
      selected: true
    },
    {
      name: 'Firebase',
      id: 7,
      selected: false
    }
  ]

  // Getting Selected Skills and Count
  getSelected() {
    this.selected_skills = this.skills.filter(s => {
      return s.selected;
    });
    this.selected_count = this.selected_skills.length;
    //alert(this.selected_skills);    
  }

  // Clearing All Selections
  clearSelection() {
    this.searchText = "";
    this.skills = this.skills.filter(g => {
      g.selected = false;
      return true;
    });
    this.getSelected();
  }

  //Delete Single Listed Skill Tag
  deleteSkill(id: number) {
    this.searchText = "";
    this.skills = this.skills.filter(g => {
      if (g.id == id)
        g.selected = false;

      return true;
    });
    this.getSelected();
  }

  //Clear Render Skill by X-user
  clearFilter() {
    this.searchText = "";
  }
}
