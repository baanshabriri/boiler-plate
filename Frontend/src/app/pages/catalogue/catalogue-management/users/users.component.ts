import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    
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
  
    constructor() {
    }
  
    ngOnInit() {
    }
  
  }
  