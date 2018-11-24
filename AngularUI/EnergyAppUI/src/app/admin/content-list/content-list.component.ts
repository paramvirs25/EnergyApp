import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { ContentList } from '../../_models/contentModelExtensions';
import { ContentService } from '../../_services';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

    displayedColumns: string[] = ['contentId', 'contentName', 'contentUrl', 'contentType', 'actions'];
    gridDataSource: MatTableDataSource<ContentList>;
    content: ContentList[] = [];
    contentIdToDelete = 0;
    showModal = false;
    lblmodalContent = "";

    isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private contentService: ContentService,
        private router: Router) { }

    ngOnInit() {
        this.bindContentList();
    }

    //Bind Grid
    bindContentList() {
        this.contentService.getList().subscribe(contentlist => {
            this.gridDataSource = new MatTableDataSource(contentlist);
            this.content = contentlist;
            this.isLoadingResults = false;

            this.gridDataSource.sort = this.sort;
            this.gridDataSource.paginator = this.paginator;
        });
    }   

    // Search Content
    applyFilter(filterValue: string) {
        this.gridDataSource.filter = filterValue.trim().toLowerCase();
    }
}
