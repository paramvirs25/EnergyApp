import { Component, OnInit } from '@angular/core';
import { AlertService, ContentService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../app.constant';

import { ValidationCheck } from '../../_helpers';

@Component({
    selector: 'app-content-detail',
    templateUrl: './content-detail.component.html',
    styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

    constructor(
        private contentService: ContentService,
        private router: Router,
        private alertService: AlertService,
        private activeRoute: ActivatedRoute,
        private validationCheck: ValidationCheck,
        private formBuilder: FormBuilder) { }

    contentDetailsForm: FormGroup;
    //contentTypeOptions

    isLoadingResults = false;
    isSaving = false;

    contentId = 0; //Add Mode
    lblAddEditContent: string;
    isEditMode = false;

    contentname = new FormControl('', [Validators.required]);
    contenturl = new FormControl('', [Validators.required]);
    ddcontenttype = new FormControl(null);

    matcher = this.validationCheck.errorStateMatcher();

    ngOnInit() {
        this.contentId = +this.activeRoute.snapshot.paramMap.get('id'); // get id as number

        //Initialise validations
        this.initValidators();

        //Add Mode
        if (this.contentId == 0) {
            this.lblAddEditContent = "Add Content";
            //this.isLoadingResults = true;
        }
        //Edit Mode
        else if (this.contentId > 0) {
            this.lblAddEditContent = "Edit Content -> ContentId - " + this.contentId;
            this.isEditMode = true;
            this.isLoadingResults = true;

            //Bind Controls for Edit Mode
            this.getForEdit(this.contentId);
        }
    }

    //Bind Controls for Edit Mode
    getForEdit(contentId) {

        this.contentService.getById(contentId).subscribe(ce => {

            this.contentCtrls.contentname.setValue(ce.contentName);
            this.contentCtrls.contenturl.setValue(ce.contentUrl);

            //initContentTypes()

            this.isLoadingResults = false;
        },
        error => {
            this.isLoadingResults = false;
            this.router.navigate(['/', AppConstants.contentListComponentPath]);
        });
    }

    // convenience getter for easy access to form fields
    get contentCtrls() { return this.contentDetailsForm.controls; }

    //Initialise form validators
    initValidators() {
        this.contentDetailsForm = this.formBuilder.group({
            contentname: this.contentname,
            contenturl: this.contenturl,
            ddcontenttype: this.ddcontenttype
        });
    }

    // Initialise Dropdown ContentTypes
    initContentTypes() {
        //this.contentCtrls.ddcontenttype.setValue(this.contentTypeOptions[0].contentTypeId);
    }

    // Go To Content List
    goContentListPage() {
        this.router.navigate(['/', AppConstants.contentListComponentPath]);
    }

    save() {

        // make controls touched for validation to work
        this.validationCheck.makeCtrlsTouched(this.contentCtrls);

        // stop here if form is invalid
        if (this.contentDetailsForm.invalid) {
            return;
        }
    }
}
