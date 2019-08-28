import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {Device} from '../../../../../@core/models/devices';

@Component({
  selector: 'devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.scss']
})
export class DevicesEditComponent implements OnInit {

  id: number = null;
  device: Device = <Device>{};

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
          this.device = await this.http.get(this.id, {__include: ['external_id']}, 'device');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }

  async save() {

      try {
          this.toaster.showToast('Saved device successful', 'Success', false);
      } catch (e) {
          this.toaster.showToast('Error saving device', 'Error', true, e);
      }
  }
}