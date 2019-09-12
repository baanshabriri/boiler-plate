import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

	filters = [
      {name: 'Disabled', value: '__is_disabled__bool'},
    ];
  
    columns = [
        {
            name: 'external_id',
            displayName: 'ID',
        },
        {
            name: 'name',
            displayName: 'Name',
        },
    ];


  constructor() { }

  ngOnInit() {
  }

}
