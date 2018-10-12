import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

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
