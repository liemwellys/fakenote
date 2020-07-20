import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../models/post.entity';
import { Repository } from 'typeorm';
import { FNPost } from '../models/post.interface';
// import { User } from 'src/user/models/user.interface'
import { Observable, from } from 'rxjs';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ){}

    createPost(post: FNPost): Observable<FNPost> {
        return from(this.postRepository.save(post))
    }
    
    updatePost(idpost: number, post: FNPost): Observable<any>{
        return from(this.postRepository.update(idpost, post));
    }

    deactivePost(idpost: number, post: FNPost): Observable<any>{
        post.active = 0;
        return from(this.postRepository.update(idpost, post));
    }
}
