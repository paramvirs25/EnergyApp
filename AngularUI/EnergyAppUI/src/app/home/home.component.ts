import { Component, OnInit } from '@angular/core';

import { UserContentService } from '../_services';
import { UserContentList } from '../_models/userContentModelExtensions';
import { forEach } from '@angular/router/src/utils/collection';

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
    selectedContentId = 0;
    
    constructor(private userContentService: UserContentService) { }

    ngOnInit(): void {        
        this.getLoggedinUserContent();
    }

    // Runs when Youtube player is ready
    readyPlayer(player) {
        this.player = player;

        //When player is ready set default content list
        if (this.defaultusercontent) {
            this.onUserContentClick(this.defaultusercontent);
        }
    }

    // Check state of youtube player
    onStateChange(event) {
        //Check if player state has ended.. mark video complete
        if (event.data == YT.PlayerState.ENDED) {            

            for (let i in this.usercontentlist) {
                let uc = this.usercontentlist[i];

                //Check if selected video ended is not marked completed earlier
                if (this.selectedContentId == uc.contentId && !uc.isComplete) {

                    //make video marked completed
                    this.userContentService.updateLoggedIn(this.selectedContentId).subscribe(isMarkComplete => {
                        if (isMarkComplete) {
                            uc.isComplete = true;
                        }
                    });
                }
            }
        }
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

        // get usercontentlist by logged userid
        this.userContentService.getListLoggedIn().subscribe(list => {

            this.usercontentlist = list;
            this.defaultusercontent = list[0];
        });
    }
    
    //when specific usercontent is clicked
    onUserContentClick(uc: UserContentList) {

        if (this.lblVideoName != uc.contentName) // Check if same link is not clicked
        {
            this.lblVideoName = uc.contentName;

            // check if youtube player API is ready
            if (this.player) {

                this.videoId = this.getYoutubeVideoId(uc.contentUrl);
                this.player.cueVideoById(this.videoId); //cue by video id doesnt play by default

                this.selectedContentId = uc.contentId;
            }
        }
    }
}
