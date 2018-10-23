import { Component, OnInit } from '@angular/core';
import { UserService, RolesService } from '../../_services';

import { Roles } from '../../_models';
import { UserLogin, UserDetails } from '../../_models';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    constructor(
        private userService: UserService,
        private rolesService: RolesService) { }
    roleOptions: Roles[];
    selectedRole: number;
    userLogin: UserLogin;
    userDetail: UserDetails;

    ngOnInit() {
        this.rolesService.getRoles().subscribe(roles => {
            this.roleOptions = roles;
            this.selectedRole = this.roleOptions[0].roleId;
        });
    }

    //save user
    save() {
        this.userLogin = new UserLogin();
        this.userLogin.username = "kaka";
        this.userLogin.password = "kakapass";

        this.userDetail = new UserDetails();
        this.userDetail.userId = 0;
        this.userDetail.roleId = 1;
        this.userDetail.userTypeId = 1;
        this.userDetail.userFirstName = "Kakulukia";
        this.userDetail.userLastName = "Singh";
        this.userDetail.userEmail = "kaka@kaki.com";

        this.userService.register(this.userLogin, this.userDetail)
            //.pipe(first())
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    //this.router.navigate(['/login']);
                },
                error => {
                    //this.alertService.error(error);
                    //this.loading = false;
                });
        //this.router.navigate(['/', AppConstants.userDetailComponentPath]);
    }
}
