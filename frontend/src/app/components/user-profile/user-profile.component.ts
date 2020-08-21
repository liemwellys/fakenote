import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/authentication-service/authentication.service'
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userId: number = null;
  private sub: Subscription;
  user: User = null;

  constructor(
    
    // route from browser to get the user ID 
    private activatedRoute: ActivatedRoute,

    // get the user ID
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      // get "id" parameter from activatedRoute
      this.userId = parseInt(params['id']);

      // find the user ID
      this.userService.findOne(this.userId).pipe(
        // get the user from the backend
        // then map into user variable
        map((user: User) => this.user = user)
      ).subscribe()
    })
  }

  // unsubscribe to Observable
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
