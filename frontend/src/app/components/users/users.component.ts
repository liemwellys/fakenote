import { Component, OnInit } from '@angular/core';
import { UserData, UserService } from 'src/app/services/user-service/user.service';
import { tap, map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  filterValue: string = null;
  
  dataSource: UserData = null;

  pageEvent: PageEvent;
  
  // set variables that will be displayed on the column
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(){
    // display the first 10 users of all users
    this.userService.findAll(1, 10).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    // if there is no specific user searched:
    // display all users in the database 
    if(this.filterValue == null){
      
      // avoid routing on the page "0"
      // the next page is current page incremented by 1
      page = page + 1;

      // display the "n" users in certain page 
      // where "n" is the defined limit of displayed users
      // in a single page 
      this.userService.findAll(page, size).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
    }
    
    // else: display searched user based on searched name
    else {
      this.userService.paginateByName(page, size, this.filterValue).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
    }

    
  }

  findByName(name: string) {
    
    // find specific user on and display on the first page (page=0)
    this.userService.paginateByName(0, 10, name).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe()
  }

  navigateToProfile(id) {
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }

}
