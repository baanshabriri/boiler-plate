import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {User} from '../../../../../@core/models/users';

@Component({
  selector: 'ngx-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  id: number = null;
  user: User = <User>{};

  constructor(private activateRoute: ActivatedRoute, private http: DataService, private toaster: ToastService,
              private location: Location) {
      this.activateRoute.params.subscribe(res => {
          if (res['id'] !== 'new') {
              this.id = res['id'];
              this.getCategory().then();
          }
      });
  }

  ngOnInit() {
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

      try {
          this.toaster.showToast('Saved user successful', 'Success', false);
      } catch (e) {
          this.toaster.showToast('Error saving user', 'Error', true, e);
      }
  }
}