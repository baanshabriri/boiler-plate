import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {Device} from '../../../../../@core/models/devices';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.scss']
})
export class DevicesEditComponent implements OnInit {

  id: number = null;
  device: Device = <Device>{};

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
              this.getGroup().then();
          }
      });
  }

  ngOnInit() {
  }

  async getGroup() {
      try {
          this.device = await this.http.get(this.id, {__include: ['id','group']}, 'device');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }

 async save() {
    try {
      if (this.id) {
        await this.http.update(this.id, this.device, {}, 'device');
      } else {
        const res = await this.http.create(this.device, {__only: 'id'}, 'device');
        this.id = res[0].id;
        this.device.id = res[0].id;
        await this.router.navigate(['/pages/catalogue/catalogue-management/device/' + this.id.toString(10)]);
      }
      this.toaster.showToast('Saved device successful', 'Success', false);
    } catch (e) {
      this.toaster.showToast('Error saving device', 'Error', true, e);
    }

  }
}