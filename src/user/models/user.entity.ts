import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

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
    
    @Column()
    active: number;

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }
}