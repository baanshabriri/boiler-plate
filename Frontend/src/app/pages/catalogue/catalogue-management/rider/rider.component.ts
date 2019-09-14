import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss']
})
export class RiderComponent implements OnInit {

    filters = [
      {first_name: 'Disabled', value: '__is_disabled__bool'},
    ];
  
    columns = [
        {
            name: 'id',
            displayName: 'ID',
        },
        {
            name: 'first_name',
            displayName: 'First Name',
        },
        {
            name: 'last_name',
            displayName: 'Last Name',
        },
        {
            name: 'mobile_number',
            displayName: 'Phone',
        },

    ];
  
    constructor() {
    }
  
    ngOnInit() {
    }
  
  }
