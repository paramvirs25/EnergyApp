import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../_services';

import { Roles } from '../../_models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    constructor(private rolesService: RolesService) { }
    roleOptions: Roles[];
    selectedRole: number;

    ngOnInit() {

        this.rolesService.getRoles().subscribe(roles => {
            this.roleOptions = roles;
            this.selectedRole = this.roleOptions[0].roleId;
        });
  }

}
