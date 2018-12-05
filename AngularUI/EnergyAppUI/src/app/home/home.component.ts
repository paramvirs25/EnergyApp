import { Component, OnInit } from '@angular/core';

import { UserContentService, UserService } from '../_services';
import { UserContentList } from '../_models/userContentModelExtensions';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    usercontentlist: UserContentList[];
    current: number = 0;

    lblVideoName: string;
    videoHtml: string;

    constructor(private userService: UserService,
        private userContentService: UserContentService,
        private embedService: EmbedVideoService) { }   


    ngOnInit(): void {
        
        this.getLoggedinUserContent();
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
    
    //when specific usercontent is clicked
    onUserContentClick(uc: UserContentList) {
        if (this.lblVideoName != uc.contentName)
        {
            this.lblVideoName = uc.contentName;
            this.videoHtml = this.embedService.embed(uc.contentUrl, { attr: { width: '100%', height: 300 } });
        }
    }
}
