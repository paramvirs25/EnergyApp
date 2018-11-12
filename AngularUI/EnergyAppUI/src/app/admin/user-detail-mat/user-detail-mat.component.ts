import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Roles, UserTypes, UserLogin, UserDetailBase } from '../../_models';
import { AppConstants } from '../../app.constant';
import { UserCreateSave } from '../../_models/userModelExtensions';

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
    userCreateSave: UserCreateSave;
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
                    //this.goUserListPage();
                });
        }
    }

    save() {
        this.isSaving = true;

        // stop here if form is invalid
        //if (this.userDetailsForm.invalid) {
        //    return;
        //}

        //Save user details
        this.userCreateSave = new UserCreateSave();

        this.userCreateSave.user = new UserLogin();
        this.userCreateSave.user.userId = this.userId;
        this.userCreateSave.user.username = "testU"; //this.f.username.value;
        this.userCreateSave.user.password = "testP"; //this.f.password.value;

        this.userCreateSave.userDetailsBase = new UserDetailBase();
        this.userCreateSave.userDetailsBase.userFirstName = "FName"; //this.f.firstname.value;
        this.userCreateSave.userDetailsBase.userLastName = "LName"; //this.f.lastname.value;
        this.userCreateSave.userDetailsBase.userEmail = "FName@LNAME.com"; //this.f.email.value;
        this.userCreateSave.userDetailsBase.roleId = 100; //this.f.ddrole.value;
        this.userCreateSave.userDetailsBase.userTypeId = 1; //this.f.ddusertype.value;

        //console.log(this.userSave);

        this.isSaving = true;
        this.userService.create(this.userCreateSave).subscribe(
            data => {
                this.isSaving = false;
                this.alertService.success('User Created Successfully', true);
                this.goUserListPage();
            },
            error => {
                //this.alertService.error(error);
                this.isSaving = false;
            });

        //this.goUserListPage();
    }

    // Initialise Dropdown Roles
    initRoles(roles: Roles[]) {
        this.roleOptions = roles;
    }

    // Initialise Dropdown UserTypes
    initUserTypes(userTypes: UserTypes[]) {
        this.userTypeOptions = userTypes;
    }

    // Go To Users List
    goUserListPage() {
        this.router.navigate(['/', AppConstants.userListComponentPath]);
    }

}
