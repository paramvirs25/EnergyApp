import { Component, OnInit } from '@angular/core';
import { AlertService, UserService, RolesService, UserTypesService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        private alertService: AlertService,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder) { }

    roleOptions: Roles[];
    userTypeOptions: UserTypes[];
    hasRoles = false;
    hasUserTypes = false;
    areControlsLoaded = false;
    userLogin: UserLogin;
    userDetail: UserDetails;

    userDetailsForm: FormGroup;
    submitted = false;

    userId = 0; //Add Mode
    lblAddEditUser = "Add";
    hasUserId = false;

    ngOnInit() {

        this.userId = +this.activeRoute.snapshot.paramMap.get('id');

        // Define validations and control names
        this.userDetailsForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirmpassword: ['', [Validators.required, Validators.minLength(4)]],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            ddrole: new FormControl(null),
            ddusertype: new FormControl(null)
        });

        //Initialise DropDowns
        this.initRoles();
        this.initUserTypes();
   
        //Edit Mode
        if (this.userId > 0) {
            this.hasUserId = true;
            this.lblAddEditUser = "Edit"

            this.userService.getById(this.userId).subscribe(user => {

                this.userDetail = new UserDetails();
                this.userDetail = user; // bind modal to load controls

                this.f.firstname.setValue(user.userFirstName);
                this.f.lastname.setValue(user.userLastName);
                this.f.email.setValue(user.userEmail);

                this.areControlsLoaded = true;
                this.bindDropdowns();
            });
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

        //Save user details
        this.userLogin = new UserLogin();        
        this.userLogin.username = this.f.username.value;
        this.userLogin.password = this.f.password.value;
        this.userLogin.userId = this.userId;

        this.userDetail = new UserDetails();
        this.userDetail.userId = this.userId;
        this.userDetail.roleId = this.f.ddrole.value;
        this.userDetail.userTypeId = this.f.ddusertype.value;
        this.userDetail.userFirstName = this.f.firstname.value;
        this.userDetail.userLastName = this.f.lastname.value;
        this.userDetail.userEmail = this.f.email.value;

        console.log(this.userLogin);
        console.log(this.userDetail);
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

        //this.router.navigate(['/', AppConstants.userListComponentPath]);
    }

    // Initialise Dropdown Roles
    initRoles() {
        this.rolesService.getRoles().subscribe(roles => {
            this.roleOptions = roles;
            this.f.ddrole.setValue(this.roleOptions[0].roleId); // Set Default value

            this.hasRoles = true;
            this.bindDropdowns();
        });
    }

    // Initialise Dropdown UserTypes
    initUserTypes() {
        this.userTypesService.getUserTypes().subscribe(userTypes => {
            this.userTypeOptions = userTypes;
            this.f.ddusertype.setValue(this.userTypeOptions[0].userTypeId); // Set Default value

            this.hasUserTypes = true;
            this.bindDropdowns();
        });
    }

    // bind Dropdowns
    // Call this method on all calls
    bindDropdowns() {
        if (this.hasRoles && this.hasUserTypes && this.areControlsLoaded) {
            this.f.ddrole.setValue(this.userDetail.roleId);
            this.f.ddusertype.setValue(this.userDetail.userTypeId);
        }
    }

    // Go To Add Users
    goUserListPage() {
        this.router.navigate(['/', AppConstants.userListComponentPath]);
    }
}
