import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/service/user.service";
import { Observable } from "rxjs";
import { User } from "src/user/models/user.interface";
import { map } from "rxjs/operators";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        
        @Inject(forwardRef(()=> UserService))
        private userService: UserService
        ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!roles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user.user;
        
        return this.userService.findOne(user.iduser).pipe(
            map((user: User) => {
                // if the role is exist then the index of user role
                // value will be bigger than -1
                const hasRole = () => roles.indexOf(user.role) > -1;
                
                // default value of has role is false
                let hasPermission: boolean = false;

                if(hasRole()) {
                    hasPermission = true
                };
                return user && hasPermission;
            })
        )
    }
}