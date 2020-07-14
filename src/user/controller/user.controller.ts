import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body()user: User): Observable<User>{
        return this.userService.create(user);
    }
    
    @Get(':id')
    findOne(@Param()params): Observable<User>{
        return this.userService.findOne(params.id);    
    }

    @Get()
    findAll(): Observable<User[]>{
        return this.userService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') iduser: string): Observable<User> {
        return this.userService.deleteOne(Number(iduser));
    }

    @Put(':id')
    updateOne(@Param('id') iduser: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(iduser), user);
    }
}
