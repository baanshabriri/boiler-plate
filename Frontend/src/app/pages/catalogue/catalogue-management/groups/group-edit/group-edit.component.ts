import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../../@core/utils/data.service';
import {ToastService} from '../../../../../@core/utils/toast.service';
import {Group} from '../../../../../@core/models/groups';
import { DevicesComponent } from '../../devices/devices.component';
import { Router } from '@angular/router'


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
		name: 'id',
		displayName: 'ID',
	},
	{
		name: 'name',
		displayName: 'Name',
	},
	];

	constructor(private activateRoute: ActivatedRoute, private http: DataService, private toaster: ToastService,
				private location: Location, private router: Router){
		this.activateRoute.params.subscribe(res => {
			if (res['id'] !== 'new'){
				this.id = res['id'];
				this.getGroup().then();
			}

		});
	}


  ngOnInit() {
  }

  async getGroup() {
      try {
          this.group = await this.http.get(this.id, {__include: ['id']}, 'group');
      } catch (e) {

      }
  }

  async cancel() {
      this.location.back();
  }

  async save() {
    try {
      if (this.id) {
        await this.http.update(this.id, this.group, {}, 'group');
      } else {
        const res = await this.http.create(this.group, {__only: 'id'}, 'group');
        this.id = res[0].id;
        this.group.id = res[0].id;
        await this.router.navigate(['/pages/catalogue/catalogue-management/group/' + this.id.toString(10)]);
      }
      this.toaster.showToast('Saved group successful', 'Success', false);
    } catch (e) {
      this.toaster.showToast('Error saving group', 'Error', true, e);
    }
  }
}

  