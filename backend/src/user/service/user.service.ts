import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, Like } from 'typeorm';
import { User, UserRole } from '../models/user.interface';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError, retry } from 'rxjs/operators';
import { AuthService } from 'src/auth/service/auth.service';
// import { resourceUsage } from 'process';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = UserRole.USER;
                newUser.active = user.active;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
        // return from(this.userRepository.save(user));
    }

    findOne(iduser: number): Observable<User> {
        return from(this.userRepository.findOne({iduser})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        )
        // return from(this.userRepository.findOne({iduser}));
    }

    findAll(): Observable<User[]>{
        return from(this.userRepository.find()).pipe(
            map((users) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );
    }

    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((userPageable: Pagination<User>) => {
                userPageable.items.forEach(function (v) {delete v.password});

                return userPageable;
            })
        )
    }

    paginateFilterByName(options: IPaginationOptions, user: User): Observable<Pagination<User>>{
        
        // find specific user from defined by user 
        return from(this.userRepository.findAndCount({
            
            // amount of data want to be taken from requested page
            // the first defined "n" results will be shown in page=0
            // during the GET request, page value need to be defined by "0"
            // in order to view the results in first page
            skip: options.page * options.limit || 0,
            
            // maximum number of data should be taken
            // default maximum value of taken data is 10
            // maximum value can be overiden during get request
            take: options.limit || 10,

            // order the data in ascending
            order: {iduser: "ASC"}, 

            // column that will be retrieved
            select: ['iduser', 'name', 'email', 'role'],

            // where searched "name" will be have the same character
            // specified on search input
            where:[
                {name: Like(`%${user.name}%`)}
            ]
        })).pipe(
            map(([user, totalUser]) =>{
                const userPageable: Pagination<User> = {
                    items: user,
                    links: {
                        first: options.route + `?limit=${options.limit}`,
                        previous: options.route + ``,
                        next: options.route + `?limit=${options.limit}&page=${options.page + 1}`,
                        last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUser / options.page)}`
                    },
                    meta: {
                        currentPage: options.page,
                        
                        // amount of data records obtained
                        itemCount: user.length,
                        
                        // amount of item want to displayed
                        itemsPerPage: options.limit,
                        
                        // total amount of user
                        totalItems: totalUser,

                        // number of pages containing searched users
                        totalPages: Math.ceil(totalUser / options.limit)
                    }
                };
                return userPageable;
            })
        )
    }

    deleteOne(iduser: number): Observable<any>{
        return from(this.userRepository.delete(iduser));
    }

    updateOne(iduser: number, user: User): Observable<any>{
        delete user.email;
        delete user.password;
        delete user.role;

        return from(this.userRepository.update(iduser, user));
    }

    updateRoleOfUser(iduser: number, user: User): Observable<any> {
        return from(this.userRepository.update(iduser, user));
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User>{
        return this.findByMail(email).pipe(
            switchMap((user: User) => this.authService.comparePassword(password, user.password).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    } else{
                        throw Error;
                    }
                })
            ))
        )
    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOne({email}));
    } 
}
