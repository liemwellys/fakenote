import { CanActivate, Injectable, Inject, forwardRef, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/user/service/user.service";
import { User } from "src/user/models/user.interface";
import { map } from "rxjs/operators";

@Injectable()
export class UserIsUserGuard implements CanActivate{
    
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ){

    }

    // Authenticate current user has authorization modifiying data
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        // obtain the requested user's paramater 
        const params = request.params;
        
        // obtain the current user's parameter
        const user: User = request.user.user;

        return this.userService.findOne(user.iduser).pipe(
            map((user: User) => {
                let hasPermission = false;

                // if current user's ID === requested user's ID
                // permission is given
                if(user.iduser === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission                
            })
        )
    }
}