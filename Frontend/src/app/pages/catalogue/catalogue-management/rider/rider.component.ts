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
            name: 'external_id',
            displayName: 'ID',
        },
        {
            name: 'first_name',
            displayName: 'Name',
        },
    ];
  
    constructor() {
    }
  
    ngOnInit() {
    }
  
  }
