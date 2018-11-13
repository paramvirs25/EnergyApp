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
    userDetailsMatForm: FormGroup;

    roleOptions: Roles[];
    userTypeOptions: UserTypes[];
    userCreateSave: UserCreateSave;
    isLoadingResults = false;
    isSaving = false;

    userId = 0; //Add Mode
    lblAddEditUser: string;
    hasUserId = false;

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
        this.userDetailsMatForm = this.formBuilder.group({
            username: this.username,
            password: this.password,
            confirmpass: this.confirmpass,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            ddrole: this.ddrole,
            ddusertype: this.ddusertype
        }, {
                validator: PasswordValidation.MatchPassword
            });
                
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

        // make all controls touched for validation to work
        for (let i in this.userDetailsMatForm.controls) {
            this.userDetailsMatForm.controls[i].markAsTouched();
        }

        // stop here if form is invalid
        if (this.userDetailsMatForm.invalid) { 
            return;
        }

        console.log("pass");
        //Save user details
        //this.userCreateSave = new UserCreateSave();

        //this.userCreateSave.user = new UserLogin();
        //this.userCreateSave.user.userId = this.userId;
        //this.userCreateSave.user.username = "testU"; //this.f.username.value;
        //this.userCreateSave.user.password = "testP"; //this.f.password.value;

        //this.userCreateSave.userDetailsBase = new UserDetailBase();
        //this.userCreateSave.userDetailsBase.userFirstName = "FName"; //this.f.firstname.value;
        //this.userCreateSave.userDetailsBase.userLastName = "LName"; //this.f.lastname.value;
        //this.userCreateSave.userDetailsBase.userEmail = "FName@LNAME.com"; //this.f.email.value;
        //this.userCreateSave.userDetailsBase.roleId = 100; //this.f.ddrole.value;
        //this.userCreateSave.userDetailsBase.userTypeId = 1; //this.f.ddusertype.value;

        ////console.log(this.userSave);

        //this.isSaving = true;
        //this.userService.create(this.userCreateSave).subscribe(
        //    data => {
        //        this.isSaving = false;
        //        this.alertService.success('User Created Successfully', true);
        //        this.goUserListPage();
        //    },
        //    error => {
        //        //this.alertService.error(error);
        //        this.isSaving = false;
        //    });

        //this.goUserListPage();
    }

    // convenience getter for easy access to form fields
    get f() { return this.userDetailsMatForm.controls; }

    // Initialise Dropdown Roles
    initRoles(roles: Roles[]) {
        this.roleOptions = roles;
        this.f.ddrole.setValue(this.roleOptions[0].roleId);
    }

    // Initialise Dropdown UserTypes
    initUserTypes(userTypes: UserTypes[]) {
        this.userTypeOptions = userTypes;
        this.f.ddusertype.setValue(this.userTypeOptions[0].userTypeId);
    }

    // Go To Users List
    goUserListPage() {
        this.router.navigate(['/', AppConstants.userListComponentPath]);
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
