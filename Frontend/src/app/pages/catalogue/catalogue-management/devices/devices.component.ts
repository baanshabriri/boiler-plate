import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

 
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