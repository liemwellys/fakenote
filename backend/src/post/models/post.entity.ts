import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Active } from 'src/post/models/post.interface';
import { UserEntity } from  'src/user/models/user.entity';

@Entity()
export class PostEntity{

    @PrimaryGeneratedColumn()
    idpost: number;
    
    @Column()
    content: string;

    @Column({type: 'enum', enum: Active, default: Active.ACTIVE})
    active: Active;

    @ManyToOne(type => UserEntity, user => user.post)
    @JoinColumn()
    user: UserEntity[]
}