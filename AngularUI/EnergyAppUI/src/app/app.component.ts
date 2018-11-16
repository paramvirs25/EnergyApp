import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AlertService } from './_services';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    private subscription: Subscription;
    message: any;

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        //console.log("AppComponent-returnUrl- " + this.route.snapshot.queryParams['returnUrl']);

        this.subscription = this.alertService.getMessage().subscribe(message => {
            if (message) {
                this.snackBar.open(
                    message.text,
                    message.type,
                    {
                        duration: 5000,
                        panelClass: ['snackBar-customClass']
                    });
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
