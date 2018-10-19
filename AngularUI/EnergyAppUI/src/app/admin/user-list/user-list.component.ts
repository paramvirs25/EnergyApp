import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { first, catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

import { UserService } from '../../_services';
import { User } from '../../_models';
import { UserShared } from '../../_shared';

//const ELEMENT_DATA: User[] = [
//  { roleId: 1, userFirstName: 'param', userId: 1, userEmail: 'abc@abc.com', userLastName: 'singh', userTypeId: 1 },
//  { roleId: 2, userFirstName: 'param2', userId: 2, userEmail: 'abc2@abc.com', userLastName: 'singh2', userTypeId: 2 },
//  { roleId: 3, userFirstName: 'param3', userId: 3, userEmail: 'abc3@abc.com', userLastName: 'singh3', userTypeId: 3 },
//];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'userFirstName', 'userLastName', 'userEmail', 'roleId', 'userTypeId'];
  //exampleDatabase: ExampleHttpDao | null;
  //data= ELEMENT_DATA;
  //data = new UserDataSource(this.userService);
  data: MatTableDataSource<User>;
 
  //resultsLength = 0;
  //isLoadingResults = true;
  //isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private userService: UserService, private userShared: UserShared) { }

  ngOnInit() {
    //this.exampleDatabase = new ExampleHttpDao(this.http);

    this.userService.getAll().subscribe(userlist => {
      this.data = new MatTableDataSource(userlist);
    });

    //this.data.paginator = this.paginator;
    //this.data.sort = this.sort;
           
    // If the user changes the sort order, reset back to the first page.
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    //merge(this.sort.sortChange, this.paginator.page)
    //  .pipe(
    //    startWith({}),
    //    switchMap(() => {
    //      this.isLoadingResults = true;
    //      return this.exampleDatabase!.getRepoIssues(
    //        this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //    }),
    //    map(data => {
    //      // Flip flag to show that loading has finished.
    //      this.isLoadingResults = false;
    //      this.isRateLimitReached = false;
    //      this.resultsLength = data.total_count;

    //      return data.items;
    //    }),
    //    catchError(() => {
    //      this.isLoadingResults = false;
    //      // Catch if the GitHub API has reached its rate limit. Return empty data.
    //      this.isRateLimitReached = true;
    //      return observableOf([]);
    //    })
    //  ).subscribe(data => this.data = data);
  }
}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getAll();
  }
  disconnect() { }
}

export interface GithubApi {
  items: User[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
