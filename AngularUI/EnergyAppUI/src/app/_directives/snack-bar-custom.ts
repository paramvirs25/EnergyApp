import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AlertService } from '../_services';

import { MAT_SNACK_BAR_DATA } from '@angular/material';

/**
 * @title Snack-bar with a custom component
 */
@Component({
    selector: 'snack-bar-custom',
    template: '',
})
export class SnackBarCustomComponent {
    private subscription: Subscription;
    message: any;

    constructor(
        private alertService: AlertService,
        public snackBar: MatSnackBar) {
        //this.openSnackBar();
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        //console.log("AppComponent-returnUrl- " + this.route.snapshot.queryParams['returnUrl']);

        this.subscription = this.alertService.getMessage().subscribe(message => {
            if (message) {
                this.snackBar.openFromComponent(SnackBarComponent, {
                    data: message.text + " Test",
                    duration: 5000,
                });

                //this.snackBar.open(
                //    message.text,
                //    message.type,
                //    {
                //        duration: 5000,
                //        panelClass: ['snackBar-customClass']
                //    });
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //openSnackBar() {
    //    this.snackBar.openFromComponent(PizzaPartyComponent, {
    //        data: 'some data hai ji',
    //        duration: 5000,
    //    });
    //}
}


@Component({
    selector: 'snack-bar-component-example-snack',
    template: '{{data}}'
})
export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
