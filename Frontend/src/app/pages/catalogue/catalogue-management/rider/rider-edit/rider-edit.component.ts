import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {Rider} from '../../../../../@core/models/rider';
import { DevicesComponent } from '../../devices/devices.component';


@Component({
  selector: 'ngx-rider-edit',
  templateUrl: './rider-edit.component.html',
  styleUrls: ['./rider-edit.component.scss']
})
export class RiderEditComponent implements OnInit {

  id: number = null;
  rider: Rider = <Rider>{};

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
          this.rider = await this.http.get(this.id, {__include: ['external_id']}, 'rider');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }

  async save() {

      try {
          this.toaster.showToast('Saved rider successful', 'Success', false);
      } catch (e) {
          this.toaster.showToast('Error saving rider', 'Error', true, e);
      }
  }
}



