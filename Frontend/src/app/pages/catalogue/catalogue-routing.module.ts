import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueManagementComponent} from './catalogue-management/catalogue-management.component';
import { UsersComponent } from './catalogue-management/users/users.component';
import { UsersEditComponent } from './catalogue-management/users/users-edit/users-edit.component';
import { DevicesComponent } from './catalogue-management/devices/devices.component';
import { DevicesEditComponent } from './catalogue-management/devices/devices-edit/devices-edit.component';
import { RiderComponent } from './catalogue-management/rider/rider.component';
import { RiderEditComponent } from './catalogue-management/rider/rider-edit/rider-edit.component';



const routes: Routes = [
    {
        path: '',
        component: CatalogueManagementComponent,
        children: [
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'users/:id',
                component: UsersEditComponent,
            },
            {
                path: 'devices',
                component: DevicesComponent,
            },
            {
                path: 'devices/:id',
                component: DevicesEditComponent,
            },
            {
                path: 'rider',
                component: RiderComponent,
            },
            {
                path: 'rider/:id',
                component: RiderEditComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CatalogueRoutingModule {
}
