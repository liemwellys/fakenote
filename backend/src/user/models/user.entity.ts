import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { UserRole, Active } from './user.interface';
import { PostEntity } from 'src/post/models/post.entity';

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    iduser: number;
    
    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;
    
    @Column({type: 'enum', enum: Active, default: Active.ACTIVE})
    active: Active;

    @OneToMany(type => PostEntity, post => post.idpost)
    post: PostEntity[]

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }
}