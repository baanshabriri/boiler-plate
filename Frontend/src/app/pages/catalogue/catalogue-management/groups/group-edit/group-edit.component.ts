import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {Group} from '../../../../../@core/models/groups';
import { DevicesComponent } from '../../devices/devices.component';


@Component({
  selector: 'ngx-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

	id:number = null;
	group: Group = <Group>{};

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

	constructor(private activateRoute: ActivatedRoute, private http: DataService, private toaster: ToastService,
				private location: Location){
		this.activateRoute.params.subscribe(res => {
			if (res['id'] !== 'new'){
				this.id = res['id'];
				this.getCategory().then();
			}

		});
	}


  ngOnInit() {
  }

  async getCategory() {
      try {
          this.group = await this.http.get(this.id, {__include: ['external_id']}, 'group');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }

  async save() {

      try {
          this.toaster.showToast('Saved group successful', 'Success', false);
      } catch (e) {
          this.toaster.showToast('Error saving group', 'Error', true, e);
      }
  }
}

  