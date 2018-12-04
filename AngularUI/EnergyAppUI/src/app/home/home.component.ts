import { Component, OnInit } from '@angular/core';

import { UserContentService, UserService } from '../_services';
import { UserContentList } from '../_models/userContentModelExtensions';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    usercontentlist: UserContentList[];
    current: number = 0;

    constructor(private userService: UserService, private userContentService: UserContentService) { }

    ngOnInit(): void {

        this.getLoggedinUserContent();

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

    //Get Logged in User Content
    getLoggedinUserContent() {

        this.userService.getLoggedIn().subscribe(ud => {
            console.log(ud);

            this.userContentService.getListByUserId(ud.userId).subscribe(list => {
                console.log(list);
                this.usercontentlist = list;
            });
        });
    }
}
