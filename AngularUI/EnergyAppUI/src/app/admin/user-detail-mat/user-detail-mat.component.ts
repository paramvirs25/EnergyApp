import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';

import { Roles, UserTypes, UserLogin, UserDetailBase } from '../../_models';
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
    isLoadingResults = false;

    isSaving = false;
    isSavingLoginDetails = false;
    isSavingUserDetails = false;

    userId = 0; //Add Mode
    lblAddEditUser: string;
    isEditMode = false;

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

        // Define validations and control names
        this.loginDetailsForm = this.formBuilder.group({
            username: this.username,
            password: this.password,
            confirmpass: this.confirmpass
        },
        {   validator: PasswordValidation.MatchPassword });

        // Define validations and control names
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
        }
        else if (this.userId > 0) {
            this.lblAddEditUser = "Edit User -> UserId - " + this.userId;
            this.isEditMode = true;
            this.isLoadingResults = true;

            this.userService.getForEdit(this.userId).subscribe(
                userEdit => {
                    
                    this.loginCtrls.username.setValue(userEdit.user.username);
                    this.loginCtrls.password.setValue(userEdit.user.password);
                    this.loginCtrls.confirmpass.setValue(userEdit.user.password);

                    this.userDetailCtrls.firstname.setValue(userEdit.userDetailsBaseAdmin.userFirstName);
                    this.userDetailCtrls.lastname.setValue(userEdit.userDetailsBaseAdmin.userLastName);
                    this.userDetailCtrls.email.setValue(userEdit.userDetailsBaseAdmin.userEmail);

                    //Initialise dropdowns
                    this.initRoles(userEdit.roles);
                    this.initUserTypes(userEdit.userTypes);

                    //Bind Dropdowns
                    this.userDetailCtrls.ddrole.setValue(userEdit.userDetailsBaseAdmin.roleId);
                    this.userDetailCtrls.ddusertype.setValue(userEdit.userDetailsBaseAdmin.userTypeId);

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

        this.ucSave.userDetailsBase = new UserDetailBase();
        this.ucSave.userDetailsBase.userFirstName = this.userDetailCtrls.firstname.value;
        this.ucSave.userDetailsBase.userLastName = this.userDetailCtrls.lastname.value;
        this.ucSave.userDetailsBase.userEmail = this.userDetailCtrls.email.value;
        this.ucSave.userDetailsBase.roleId = this.userDetailCtrls.ddrole.value;
        this.ucSave.userDetailsBase.userTypeId = this.userDetailCtrls.ddusertype.value;

        console.log(this.ucSave);

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

        console.log("pass save login details");       
    }

    //Save Method for User Details Component
    saveUserDetails() {

        // make user controls touched for validation to work
        this.makeUserCtrlsTouched();

        // stop here if form is invalid
        if (this.userDetailsForm.invalid) {
            return;
        }

        console.log("pass save user details");
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
