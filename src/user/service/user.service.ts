import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}

    create(user: User): Observable<User> {
        return from(this.userRepository.save(user));
    }

    findAll(): Observable<User[]>{
        return from(this.userRepository.find());
    }

    findOne(iduser: number): Observable<User> {
        return from(this.userRepository.findOne({iduser}));
    }

    deleteOne(iduser: number): Observable<any>{
        return from(this.userRepository.delete(iduser));
    }

    updateOne(iduser: number, user: User): Observable<any>{
        return from(this.userRepository.update(iduser, user));
    }
}
