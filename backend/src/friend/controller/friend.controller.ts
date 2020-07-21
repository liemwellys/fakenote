import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FriendService } from '../service/friend.service';
import { Friend } from '../models/friend.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Controller('friend')
export class FriendController {
    constructor(private friendService: FriendService){}

    @Post()
    addFriend(@Body() friend: Friend): Observable<Friend | Object>{
        return this.friendService.addFriend(friend).pipe(
            map((friend: Friend) => friend),
            catchError(err => of({error: err.message}))
        );
    }

    @Put(':idfriend')
    acceptFriend(@Param('idfriend') idfriend: string, @Body() friend: Friend): Observable<any>{
        return this.friendService.acceptFriend(Number(idfriend), friend);
    }

    @Delete(':idfriend')
    deleteFriend(@Param('idfriend') idfriend: string): Observable<Friend>{
        return this.friendService.deleteFriend(Number(idfriend));
    }
}
