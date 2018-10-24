import { Component, OnInit } from '@angular/core';
import { AlertService, UserService, RolesService, UserTypesService } from '../../_services';
import { Router } from '@angular/router';

import { UserLogin, UserDetails, Roles, UserTypes } from '../../_models';
import { AppConstants } from '../../app.constant';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    constructor(
        private userService: UserService,
        private rolesService: RolesService,
        private userTypesService: UserTypesService,
        private router: Router,
        private alertService: AlertService) { }

    roleOptions: Roles[];
    userTypeOptions: UserTypes[];
    selectedRole: number;
    selectedUserType: number;
    userLogin: UserLogin;
    userDetail: UserDetails;

    userId = 0; //Add Mode
    lblAddEditUser = "Add";
    hasUserId = false;
    
    ngOnInit() {

        //Bind DropDowns
        this.bindRoles();
        this.bindUserTypes();

        //Edit Mode
        if (this.userId > 0) {
            this.hasUserId = true;
            this.lblAddEditUser = "Edit"
        }
    }

    //save user
    save() {
        this.userLogin = new UserLogin();
        this.userLogin.userId = 11;
        this.userLogin.username = "kaka1-yo";
        this.userLogin.password = "kakapass1-yo";

        this.userDetail = new UserDetails();
        this.userDetail.userId = 11;
        this.userDetail.roleId = 300;
        this.userDetail.userTypeId = 1;
        this.userDetail.userFirstName = "Kakuluki1-yo";
        this.userDetail.userLastName = "Singh1-yo";
        this.userDetail.userEmail = "kak1-yoa@kaki.com";

        this.userService.addEdit(this.userLogin, this.userDetail)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    //this.router.navigate(['/login']);
                },
                error => {
                    //this.alertService.error(error);
                    //this.loading = false;
                });
        //this.router.navigate(['/', AppConstants.userDetailComponentPath]);
    }

    // Bind Dropdown Roles
    bindRoles() {
        this.rolesService.getRoles().subscribe(roles => {
            this.roleOptions = roles;
            this.selectedRole = this.roleOptions[0].roleId;
        });
    }

    // Bind Dropdown Roles
    bindUserTypes() {
        this.userTypesService.getUserTypes().subscribe(userTypes => {
            this.userTypeOptions = userTypes;
            this.selectedUserType = this.userTypeOptions[0].userTypeId;
        });
    }

    // Go To Add Users
    goUserListPage() {
        this.router.navigate(['/', AppConstants.userListComponentPath]);
    }
}
