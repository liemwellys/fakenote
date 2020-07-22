import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { User, UserRole } from '../models/user.interface';
import { map, catchError } from 'rxjs/operators';
import { access } from 'fs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body()user: User): Observable<User | Object>{
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
    }
    
    @Get(':id')
    findOne(@Param()params): Observable<User>{
        return this.userService.findOne(params.id);    
    }

    @Get()
    index(@Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        
        return this.userService.paginate({
            page: Number(page),
            limit: Number(limit),
            route: 'https://localhost:3000/backend/user'
        });
    }

    @Delete(':id')
    deleteOne(@Param('id') iduser: string): Observable<User> {
        return this.userService.deleteOne(Number(iduser));
    }

    @Put(':id')
    updateOne(@Param('id') iduser: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(iduser), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') iduser: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(iduser), user);
    }
}
