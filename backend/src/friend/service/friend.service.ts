import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from '../models/friend.entity';
import { Repository, getRepository } from 'typeorm';
import { Friend, Accepted } from '../models/friend.interface';
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

        friend.accepted = Accepted.ACCEPTED;
        return from(this.friendRepository.update(idfriend, friend));
    }

    async viewFriendRequest(iduser: number): Promise<Friend[]>{
        const friendRequest = await getRepository(FriendEntity).find({
            userId2: iduser 
        });
        return friendRequest;
    }
    
    deleteFriend(idfriend: number): Observable<any>{    
        return from(this.friendRepository.delete(idfriend));
    }
}
