import { Component, OnInit } from '@angular/core';

import { UserContentService, UserService } from '../_services';
import { UserContentList } from '../_models/userContentModelExtensions';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    lblVideoName: string;
    videoId: string;
    player: YT.Player;

    usercontentlist: UserContentList[];
    defaultusercontent: UserContentList;

    videoHtml: string;

    constructor(private userService: UserService,
        private userContentService: UserContentService) { }

    ngOnInit(): void {        
        this.getLoggedinUserContent();
    }

    readyPlayer(player) {
        this.player = player;

        //When player is ready set default content list
        if (this.defaultusercontent) {
            this.onUserContentClick(this.defaultusercontent);
        }

        console.log('player instance', player);
    }

    onStateChange(event) {
        console.log('player state', event.data);

        //switch (this.ytEvent.getPlayerState()) {
        //    case PLAYING:
        //        if (this.cleanTime() == 0) {
        //            console.log('started ' + this.cleanTime());
        //        } else {
        //            console.log('playing ' + this.cleanTime());
        //        };
        //        break;
        //    case window['YT'].PlayerState.PAUSED:
        //        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
        //            console.log('paused' + ' @ ' + this.cleanTime());
        //        };
        //        break;
        //    case window['YT'].PlayerState.ENDED:
        //        console.log('ended ');
        //        break;
        //};
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

    //Get Logged in User's UserContent
    getLoggedinUserContent() {

        //get logged in user details
        this.userService.getLoggedIn().subscribe(ud => {

            // get usercontentlist by logged userid
            this.userContentService.getListByUserId(ud.userId).subscribe(list => {

                this.usercontentlist = list;
                this.defaultusercontent = list[0];
            });
        });
    }
    
    //when specific usercontent is clicked
    onUserContentClick(uc: UserContentList) {

        if (this.lblVideoName != uc.contentName) // Check if same link is not clicked
        {
            this.lblVideoName = uc.contentName;

            // check if youtube player is ready
            if (this.player) {

                this.videoId = this.getYoutubeVideoId(uc.contentUrl);
                this.player.cueVideoById(this.videoId); //add by video id
            }
        }
    }
}
