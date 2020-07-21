import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from '../models/friend.entity';
import { Repository } from 'typeorm';
import { Friend } from '../models/friend.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class FriendService {

    constructor(
        @InjectRepository(FriendEntity) private readonly friendRepository: Repository<FriendEntity>
    ){}

    addFriend(friend: Friend): Observable<Friend>{
        return from(this.friendRepository.save(friend));
    }

    acceptFriend(idfriend: number, friend: Friend): Observable<any>{
        delete friend.userId1;
        delete friend.userId2;

        friend.accepted = 1;
        return from(this.friendRepository.update(idfriend, friend));
    }
    
    deleteFriend(idfriend: number): Observable<any>{    
        return from(this.friendRepository.delete(idfriend));
    }
}
