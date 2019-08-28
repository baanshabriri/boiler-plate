import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-catalogue-management',
    templateUrl: './catalogue-management.component.html',
    styleUrls: ['./catalogue-management.component.scss'],
})

export class CatalogueManagementComponent implements OnInit {

    tabs = [
        {
            title: 'Users',
            route: './users',
        },
        {
            title: 'Devices',
            route: './devices',
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
