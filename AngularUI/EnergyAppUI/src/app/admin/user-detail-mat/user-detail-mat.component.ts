import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';

import { Roles, UserTypes, UserLogin, UserDetailsBaseAdmin, UserDetailBase } from '../../_models';
import { AppConstants } from '../../app.constant';
import { UserCreateSave } from '../../_models/userModelExtensions';
import { ErrorStateMatcher } from '@angular/material/core';


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
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder) { }

    passhide = true;
    confirmhide = true;
    loginDetailsForm: FormGroup;
    userDetailsForm: FormGroup;

    roleOptions: Roles[];
    userTypeOptions: UserTypes[];
    ucSave: UserCreateSave;
    userLogin: UserLogin;
    userDetailBase: UserDetailBase;
    userDetailsBaseAdmin: UserDetailsBaseAdmin;

    isLoadingResults = false;
    isShowLoginCtrls = false;

    isSaving = false;
    isSavingLoginDetails = false;
    isSavingUserDetails = false;

    userId = 0; //Add Mode
    lblAddEditUser: string;
    isEditMode = false;
    isloggedInUser = false;

    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    confirmpass = new FormControl('', [Validators.required, Validators.minLength(4)]);
    firstname = new FormControl('', [Validators.required]);
    lastname = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    ddrole = new FormControl(null);
    ddusertype = new FormControl(null);

    matcher = new MyErrorStateMatcher();

    ngOnInit() {

        this.userId = +this.activeRoute.snapshot.paramMap.get('id');
        this.isloggedInUser = this.activeRoute.snapshot.paramMap.get('isloggedinUser') == "true";

        //Reloads page when Current Route params are changed
        this.activeRoute.params.subscribe(() => {
            this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
            };
        })
                        
        // Define validations and control names for Login Details
        this.loginDetailsForm = this.formBuilder.group({
            username: this.username,
            password: this.password,
            confirmpass: this.confirmpass
        },
        {   validator: PasswordValidation.MatchPassword });

        // Define validations and control names for User Details
        this.userDetailsForm = this.formBuilder.group({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            ddrole: this.ddrole,
            ddusertype: this.ddusertype
        });
                
        //Add Mode
        if (this.userId == 0) {
            this.lblAddEditUser = "Add User";
            this.isShowLoginCtrls = true;
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
                });
        } //Edit Mode
        else if (this.userId > 0) {
            this.lblAddEditUser = "Edit User -> UserId - " + this.userId;
            this.isEditMode = true;
            this.isLoadingResults = true;
            
            this.userService.getForEdit(this.userId).subscribe(
                ue => {
                    
                    this.loginCtrls.username.setValue(ue.user.username);
                    this.loginCtrls.password.setValue(ue.user.password);
                    this.loginCtrls.confirmpass.setValue(ue.user.password);

                    this.userDetailCtrls.firstname.setValue(ue.userDetailsBaseAdmin.userFirstName);
                    this.userDetailCtrls.lastname.setValue(ue.userDetailsBaseAdmin.userLastName);
                    this.userDetailCtrls.email.setValue(ue.userDetailsBaseAdmin.userEmail);

                    //Initialise dropdowns
                    this.initRoles(ue.roles);
                    this.initUserTypes(ue.userTypes);

                    //Bind Dropdowns
                    this.userDetailCtrls.ddrole.setValue(ue.userDetailsBaseAdmin.roleId);
                    this.userDetailCtrls.ddusertype.setValue(ue.userDetailsBaseAdmin.userTypeId);

                    this.isLoadingResults = false;
                },
                error => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/', AppConstants.userListComponentPath]);
                });
        }     
    }

    //Save Method to Create User
    saveforCreate() {

        // make all controls touched for validation to work
        this.makeLoginCtrlsTouched();
        this.makeUserCtrlsTouched();       

        // stop here if form is invalid
        if (this.loginDetailsForm.invalid || this.userDetailsForm.invalid) { 
            return;
        }

        //Save user details
        this.ucSave = new UserCreateSave();

        this.ucSave.user = new UserLogin();
        this.ucSave.user.userId = this.userId;
        this.ucSave.user.username = this.loginCtrls.username.value;
        this.ucSave.user.password = this.loginCtrls.password.value;

        this.ucSave.userDetailsBaseAdmin = new UserDetailsBaseAdmin();
        this.ucSave.userDetailsBaseAdmin.userId = this.userId;
        this.ucSave.userDetailsBaseAdmin.userFirstName = this.userDetailCtrls.firstname.value;
        this.ucSave.userDetailsBaseAdmin.userLastName = this.userDetailCtrls.lastname.value;
        this.ucSave.userDetailsBaseAdmin.userEmail = this.userDetailCtrls.email.value;
        this.ucSave.userDetailsBaseAdmin.roleId = this.userDetailCtrls.ddrole.value;
        this.ucSave.userDetailsBaseAdmin.userTypeId = this.userDetailCtrls.ddusertype.value;
        
        this.isSaving = true;
        this.userService.create(this.ucSave).subscribe(
            data => {
                this.isSaving = false;
                this.alertService.success('User Created Successfully', true);
                this.goUserListPage();
            },
            error => {
                //this.alertService.error(error);
                this.isSaving = false;
            });
    }    

    //Save Method for Login Details Component
    saveLoginDetails() {

        // make Login controls touched for validation to work
        this.makeLoginCtrlsTouched();

        // stop here if form is invalid
        if (this.loginDetailsForm.invalid) {
            return;
        }

        this.userLogin = new UserLogin();
        this.userLogin.userId = this.userId;
        this.userLogin.username = this.loginCtrls.username.value;
        this.userLogin.password = this.loginCtrls.password.value;

        this.isSavingLoginDetails = true;
        this.userService.update(this.userLogin).subscribe(
            data => {
                this.isSavingLoginDetails = false;
                this.alertService.success('Login Details Saved Successfully', true);
            },
            error => {
                //this.alertService.error(error);
                this.isSavingLoginDetails = false;
            });
      
    }

    //Save Method for User Details Component
    saveUserDetails() {

        // make user controls touched for validation to work
        this.makeUserCtrlsTouched();

        // stop here if form is invalid
        if (this.userDetailsForm.invalid) {
            return;
        }

        //Save any user's general details
        if (!this.isloggedInUser) {
            this.userDetailsBaseAdmin = new UserDetailsBaseAdmin();
            this.userDetailsBaseAdmin.userId = this.userId;
            this.userDetailsBaseAdmin.userFirstName = this.userDetailCtrls.firstname.value;
            this.userDetailsBaseAdmin.userLastName = this.userDetailCtrls.lastname.value;
            this.userDetailsBaseAdmin.userEmail = this.userDetailCtrls.email.value;
            this.userDetailsBaseAdmin.roleId = this.userDetailCtrls.ddrole.value;
            this.userDetailsBaseAdmin.userTypeId = this.userDetailCtrls.ddusertype.value;

            this.isSavingUserDetails = true;
            this.userService.updateDetail(this.userDetailsBaseAdmin).subscribe(
                data => {
                    this.isSavingUserDetails = false;
                    this.alertService.success('User Details Saved Successfully', true);
                },
                error => {
                    //this.alertService.error(error);
                    this.isSavingUserDetails = false;
                });
        }
        //Save logged in user's general details
        else {
            this.userDetailBase = new UserDetailBase();
            this.userDetailBase.userId = this.userId;
            this.userDetailBase.userFirstName = this.userDetailCtrls.firstname.value;
            this.userDetailBase.userLastName = this.userDetailCtrls.lastname.value;
            this.userDetailBase.userEmail = this.userDetailCtrls.email.value;

            this.isSavingUserDetails = true;
            this.userService.updateDetailLoggedIn(this.userDetailBase).subscribe(
                data => {
                    this.isSavingUserDetails = false;
                    this.alertService.success('User Details Saved Successfully', true);
                },
                error => {
                    //this.alertService.error(error);
                    this.isSavingUserDetails = false;
                });
        }
        
    }

    // convenience getter for easy access to form fields
    get loginCtrls() { return this.loginDetailsForm.controls; }
    get userDetailCtrls() { return this.userDetailsForm.controls; }

    // Initialise Dropdown Roles
    initRoles(roles: Roles[]) {
        this.roleOptions = roles;
        this.userDetailCtrls.ddrole.setValue(this.roleOptions[0].roleId);
    }

    // Initialise Dropdown UserTypes
    initUserTypes(userTypes: UserTypes[]) {
        this.userTypeOptions = userTypes;
        this.userDetailCtrls.ddusertype.setValue(this.userTypeOptions[0].userTypeId);
    }

    // Go To Users List
    goUserListPage() {
        this.router.navigate(['/', AppConstants.userListComponentPath]);
    }

    // make Login Details Controls touched for validations
    makeLoginCtrlsTouched() {
        for (let i in this.loginCtrls) {
            this.loginCtrls[i].markAsTouched();
        }
    }

    // make User Details Controls touched for validations
    makeUserCtrlsTouched() {
        for (let i in this.userDetailCtrls) {
            this.userDetailCtrls[i].markAsTouched();
        }
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {        
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}

// Compare password validation
export class PasswordValidation {

    static MatchPassword(ac: AbstractControl) {
        if (ac.get(ControlNames.password).value != ac.get(ControlNames.confirmpass).value) {
            ac.get(ControlNames.confirmpass).setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }
}

export class ControlNames {
    static username = 'username';
    static password = 'password';
    static confirmpass = 'confirmpass';
    static firstname = 'firstname';
    static lastname = 'lastname';
    static email = 'email';
    static ddrole = 'ddrole';
    static ddusertype = 'ddusertype';
}
