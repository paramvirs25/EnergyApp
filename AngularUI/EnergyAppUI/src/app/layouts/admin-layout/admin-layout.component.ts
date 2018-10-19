import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService } from '../../_services';
import { UserShared } from '../../_shared';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService, private userShared: UserShared) { }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    this.userService.getById(this.userShared.getLoggedInUser().userid)
      .pipe(first())
      .subscribe(
        user => {
          this.currentUser = user;
        });
  }
}
