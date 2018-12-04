import { Component, PipeTransform, Pipe, OnInit } from '@angular/core';

import { UserContentService, UserService } from '../_services';
import { UserContentList } from '../_models/userContentModelExtensions';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    usercontentlist: UserContentList[];
    current: number = 0;

    lblVideoName: string;
    baseYoutubeUrl = "https://www.youtube.com/embed/";
    video: string;

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

    //Get Logged in User's UserContent
    getLoggedinUserContent() {

        this.userService.getLoggedIn().subscribe(ud => {
            console.log(ud);

            this.userContentService.getListByUserId(ud.userId).subscribe(list => {
                console.log(list);

                this.usercontentlist = list;

                //set default video
                this.onUserContentClick(list[0]);
            });
        });
    }

    //get Youtube Video Id from url
    getYoutubeVideoId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    //create youtube link in embed form
    createYoutubeVideoLink(url: string) {
        return this.baseYoutubeUrl + this.getYoutubeVideoId(url);
    }

    //when specific usercontent is clicked
    onUserContentClick(uc: UserContentList) {
        this.lblVideoName = uc.contentName;
        this.video = this.createYoutubeVideoLink(uc.contentUrl);
    }
}
