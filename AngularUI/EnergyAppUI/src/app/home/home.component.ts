import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import { UserShared } from '../_shared';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private userShared: UserShared) { }

  private loadUser() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(
        users => {
          console.log("Home - ");
          console.log(users);
        });
  }

  ngOnInit(): void {
    this.loadUser();

    //var myOptions = {
    //  autoplay: true,
    //  controls: true,
    //  width: "640",
    //  height: "400",
    //  poster: ""
    //};
    //var myPlayer = amp("azuremediaplayer", myOptions);
    //myPlayer.src([{ src: "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest", type: "application/vnd.ms-sstr+xml" },]);
  }
}
