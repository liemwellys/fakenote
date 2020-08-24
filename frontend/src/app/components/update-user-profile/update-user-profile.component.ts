import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, User } from 'src/app/services/authentication-service/authentication.service'
import { UserService } from 'src/app/services/user-service/user.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      iduser: [{value: null, disabled: true}, [Validators.required]],
      name: [null, [Validators.required]]
    });

    this.authService.getUserId().pipe(
      switchMap((iduser: number) => this.userService.findOne(iduser).pipe(
        tap((user: User) => {          
          
          // update certain value on user
          this.form.patchValue({
            iduser: user.iduser,
            name: user.name,
          })
        })
      ))
    ).subscribe()
  }

  update(){
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }

}
