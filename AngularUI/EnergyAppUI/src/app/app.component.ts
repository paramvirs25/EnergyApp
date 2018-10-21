import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    constructor(
        private route: ActivatedRoute) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        //console.log("AppComponent-returnUrl- " + this.route.snapshot.queryParams['returnUrl']);
    }
}
