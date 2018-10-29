import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../../_services';
import { UserList } from '../../_models/userModelExtensions';
import { AppConstants } from '../../app.constant';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['userId', 'userFirstName', 'userLastName', 'userEmail', 'roleName', 'userTypeName', 'actions'];
    gridDataSource: MatTableDataSource<UserList>;
    users: UserList[] = [];
    showModal = false;
    lblmodalContent = "";

    isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService,
        private router: Router) { }

    ngOnInit() {

        this.userService.getList().subscribe(userlist => {
            this.gridDataSource = new MatTableDataSource(userlist);
            this.users = userlist;
            this.isLoadingResults = false;

            console.log(userlist);

            this.gridDataSource.sort = this.sort;
            this.gridDataSource.paginator = this.paginator;
        });
    }

    // Search Users
    applyFilter(filterValue: string) {
        this.gridDataSource.filter = filterValue.trim().toLowerCase();
    }

    // Go To Add Users
    goAddUserDetails() {
        //this.router.navigate(['/', AppConstants.userDetailComponentPath]);
        this.router.navigate(['/userdetail/0']);
    }

    //Delete User
    onDelete(user: UserList): void {
        this.showModal = true;
        this.lblmodalContent = "Are you sure you want to delete user " + user.userFirstName + " " + user.userLastName + " with UserId - " + user.userId + "?";
        console.log(user);
    }

    closeModal() {
        this.showModal = false;
    }
}

