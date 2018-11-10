import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Roles, UserTypes } from '../../_models';
import { AppConstants } from '../../app.constant';
import { UserSave } from '../../_models/userModelExtensions';

@Component({
    selector: 'app-user-detail-mat',
    templateUrl: './user-detail-mat.component.html',
    styleUrls: ['./user-detail-mat.component.css']
})
export class UserDetailMatComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router,
        private alertService: AlertService,
        private activeRoute: ActivatedRoute, ) { }

    passhide = true;
    confirmhide = true;

    roleOptions: Roles[];
    userTypeOptions: UserTypes[];
    userSave: UserSave;
    isLoadingResults = false;
    isSaving = false;
    submitted = false;

    userId = 0; //Add Mode
    lblAddEditUser: string;
    hasUserId = false;

    ngOnInit() {

        this.userId = +this.activeRoute.snapshot.paramMap.get('id');

        //Add Mode
        if (this.userId == 0) {
            this.lblAddEditUser = "Add";
            this.isLoadingResults = true;

            //Get Data for Create Mode
            this.userService.getForCreate().subscribe(
                userCreate => {
                    //Initialise dropdowns
                    this.initRoles(userCreate.roles);
                    this.initUserTypes(userCreate.userTypes);

                    this.isLoadingResults = false;
                },
                error => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/', AppConstants.userListComponentPath]);
                });
        }
    }

    // Initialise Dropdown Roles
    initRoles(roles: Roles[]) {
        this.roleOptions = roles;
    }

    // Initialise Dropdown UserTypes
    initUserTypes(userTypes: UserTypes[]) {
        this.userTypeOptions = userTypes;
    }

    // Go To Add Users
    goUserListPage() {
        this.router.navigate(['/', AppConstants.userListComponentPath]);
    }

}
