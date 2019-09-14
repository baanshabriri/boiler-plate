import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {User} from '../../../../../@core/models/users';
import { DevicesComponent } from '../../devices/devices.component';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  id: number = null;
  user: User = <User>{};
  password: string = undefined;
  roles$: Promise<any>;

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
              this.id = parseInt(res['id'], 10);
              this.getUser().then();
          }
      });
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles(){
    this.roles$ = this.http.query({}, 'role');
  }

  async getUser() {
    try {
      this.user = await this.http.get(this.id, {__include: ['mobile_number', 'email', 'id']}, 'user');
    } catch (e) {

    }
  }
 


  async getCategory() {
      try {
          this.user = await this.http.get(this.id, {__include: ['external_id']}, 'user');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }



  async save() {
    if (this.password) {
      this.user.password = this.password;
    }
    try {
      if (this.id) {
        await this.http.update(this.id, this.user, {}, 'user');
      } else {
        const res = await this.http.create(this.user, {__only: 'id'}, 'user');
        this.id = res[0].id;
        this.user.id = res[0].id;
        await this.router.navigate(['/pages/catalogue/catalogue-management/user/' + this.id.toString(10)]);
      }
      this.toaster.showToast('Saved user successful', 'Success', false);
    } catch (e) {
      this.toaster.showToast('Error saving user', 'Error', true, e);
    }

  }
}