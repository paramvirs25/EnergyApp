import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService } from '../../_services';
import { UserShared } from '../../_shared';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService, private userShared: UserShared) { }
  
  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
      this.userService.getLoggedIn()
      //.pipe(first())
      .subscribe(
        user => {
          this.currentUser = user;
        });
  }

  //deleteUser(id: number) {
  //  this.userService.delete(id).pipe(first()).subscribe(() => {
  //    this.loadAllUsers()
  //  });
  //}

  //private loadAllUsers() {
  //  this.userService.getAll().pipe(first()).subscribe(users => {
  //    this.users = users;
  //  });
  //}
}
