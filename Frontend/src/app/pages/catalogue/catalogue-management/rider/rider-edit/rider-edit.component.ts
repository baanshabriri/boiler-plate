import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {Rider} from '../../../../../@core/models/rider';
import { DevicesComponent } from '../../devices/devices.component';
import {User} from '../../../../../@core/models/users';
import {Router} from '@angular/router';




@Component({
  selector: 'ngx-rider-edit',
  templateUrl: './rider-edit.component.html',
  styleUrls: ['./rider-edit.component.scss']
})
export class RiderEditComponent implements OnInit {

  id: number = null;
  rider: Rider = <Rider>{};
  user: User = <User>{};
  roles$ :Promise<any>;
  password: string = undefined;



  columns = [
      {
          name: 'id',
          displayName: 'ID',
      },
      {
          name: 'name',
          displayName: 'Name',
      },
  ];

  constructor(private activateRoute: ActivatedRoute, private http: DataService, private toaster: ToastService,
              private location: Location, private router: Router) {
      this.activateRoute.params.subscribe(res => {
          if (res['id'] !== 'new') {
              this.id = res['id'];
              this.getRider().then();
          }
      });
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles(){
    this.roles$ = this.http.query({}, 'role');
  }


  async getRider(){
    try{
      this.rider = await this.http.get(this.id, {
        __include: ['first_name'],
      }, 'rider');
    } catch(e){

    }
  }

  async getCategory() {
      try {
          this.rider = await this.http.get(this.id, {__include: ['id']}, 'rider');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }

  async save() {
    if (this.password) {
      this.rider.password = this.password;
    }
    try {
      if (this.id) {
        await this.http.update(this.id, this.rider, {}, 'rider');
      } else {
        //this.user.role_id = 4;
        const res = await this.http.create(this.rider, {__only: 'id'}, 'rider');
        this.id = res[0].id;
        this.rider.id = res[0].id;
        await this.router.navigate(['/pages/catalogue/catalogue-management/rider/' + this.id.toString(10)] );
      }
      this.toaster.showToast('Saved rider succesfully', 'Success', false);
    } catch(e) {
      this.toaster.showToast('Error saving rider', 'Error', true, e);
    }
  }
}
