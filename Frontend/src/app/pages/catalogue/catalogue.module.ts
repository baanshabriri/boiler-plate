import {NgModule} from '@angular/core';

import {CatalogueRoutingModule} from './catalogue-routing.module';
import {CatalogueManagementComponent} from './catalogue-management/catalogue-management.component';
import {ThemeModule} from '../../@theme/theme.module';
import {NbButtonModule, NbCardModule, NbInputModule, NbRouteTabsetModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import { UsersComponent } from './catalogue-management/users/users.component';
import { UsersEditComponent } from './catalogue-management/users/users-edit/users-edit.component';
import { DevicesComponent } from './catalogue-management/devices/devices.component';
import { DevicesEditComponent } from './catalogue-management/devices/devices-edit/devices-edit.component';
import { RiderComponent } from './catalogue-management/rider/rider.component';
import { RiderEditComponent } from './catalogue-management/rider/rider-edit/rider-edit.component';
import { GroupsComponent } from './catalogue-management/groups/groups.component';
import { GroupEditComponent } from './catalogue-management/groups/group-edit/group-edit.component';

@NgModule({
    declarations: [CatalogueManagementComponent, UsersComponent, UsersEditComponent, DevicesComponent, DevicesEditComponent, RiderComponent, RiderEditComponent, GroupsComponent, GroupEditComponent],
    imports: [
        ThemeModule,
        CatalogueRoutingModule,
        NbRouteTabsetModule,
        FormsModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
    ],
})
export class CatalogueModule {
}
