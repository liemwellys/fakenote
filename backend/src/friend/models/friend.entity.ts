import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { UserEntity } from "src/user/models/user.entity";
import { Accepted } from "src/friend/models/friend.interface";

@Entity()
export class FriendEntity{

    @PrimaryGeneratedColumn()
    idfriend: number;

    @Column({name: 'userId1'})
    userId1: number;
    @ManyToMany(type => UserEntity, user1 => user1.iduser)
    @JoinColumn({name: 'userId1'})
    user1: UserEntity;

    @Column({name: 'userId2'})
    userId2: number;
    @ManyToMany(type => UserEntity, user2 => user2.iduser)
    @JoinColumn({name: 'userId2'})
    user2: UserEntity;

    @Column({type: 'enum', enum: Accepted, default: Accepted.NOTACCEPTED})
    accepted: number;
}