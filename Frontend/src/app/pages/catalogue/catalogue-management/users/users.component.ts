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
  
    columns =
    [
      {
        name:'id',
        displayName:'ID'
      },
      {
        name: 'first_name',
        displayName: 'Users',
      },
      {
        name: 'mobile_number',
        displayName: 'Mobile No.',
      },
      {
        name: 'email',
        displayName: 'Email',
      },
      {
        name: 'role',
        displayName: 'Access Level',
        displayFn: (r => r.role ? r.role.external_identity : ''),
      },
    ];

  
    constructor() {
    }
  
    ngOnInit() {
    }
  
  }
  