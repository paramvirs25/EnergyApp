import { Component, OnInit } from '@angular/core';
import { UserService, RolesService, UserTypesService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  } from '@angular/forms';

import { UserLogin, UserDetails, Roles, UserTypes } from '../../_models';
import { AppConstants } from '../../app.constant';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {    

    roleOptions: Roles[];
    userTypeOptions: UserTypes[];
    selectedRole: number;
    selectedUserType: number;
    userLogin: UserLogin;
    userDetail: UserDetails;

    userDetailsForm: FormGroup;
    submitted = false;

    userId = 0; //Add Mode
    lblAddEditUser = "Add";
    hasUserId = false;

    constructor(
        private userService: UserService,
        private rolesService: RolesService,
        private userTypesService: UserTypesService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder) { }
    
    ngOnInit() {

        this.userId = +this.activeRoute.snapshot.paramMap.get('id');

        this.userDetailsForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });

        //Bind DropDowns
        this.bindRoles();
        this.bindUserTypes();

        //Edit Mode
        if (this.userId > 0) {
            this.hasUserId = true;
            this.lblAddEditUser = "Edit"
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.userDetailsForm.controls; }
    
    //save user
    save() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.userDetailsForm.invalid) {
            return;
        }

        //this.userLogin = new UserLogin();
        //this.userLogin.username = "kaka";
        //this.userLogin.password = "kakapass";

        //this.userDetail = new UserDetails();
        //this.userDetail.userId = 0;
        //this.userDetail.roleId = 1;
        //this.userDetail.userTypeId = 1;
        //this.userDetail.userFirstName = "Kakulukia";
        //this.userDetail.userLastName = "Singh";
        //this.userDetail.userEmail = "kaka@kaki.com";

        //this.userService.register(this.userLogin, this.userDetail)
        //    //.pipe(first())
        //    .subscribe(
        //        data => {
        //            //this.alertService.success('Registration successful', true);
        //            //this.router.navigate(['/login']);
        //        },
        //        error => {
        //            //this.alertService.error(error);
        //            //this.loading = false;
        //        });
        //this.router.navigate(['/', AppConstants.userDetailComponentPath]);
    }

    // Bind Dropdown Roles
    bindRoles() {
        this.rolesService.getRoles().subscribe(roles => {
            this.roleOptions = roles;
            this.selectedRole = this.roleOptions[0].roleId;
        });
    }

    // Bind Dropdown UserTypes
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
