import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { UserRole } from './user.interface';

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
    
    @Column()
    active: number;

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }
}