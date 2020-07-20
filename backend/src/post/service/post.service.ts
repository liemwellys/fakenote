import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../models/post.entity';
import { Repository } from 'typeorm';
import { FNPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ){}

    createPost(post: FNPost): Observable<FNPost> {
        const newPost = new PostEntity();
        newPost.content = post.content;
        // newPost.userId = Math.floor(Math.random()*10) + 3;
        return from(this.postRepository.save(newPost))
    }
    
    updatePost(idpost: number, post: FNPost): Observable<any>{
        return from(this.postRepository.update(idpost, post));
    }

    deactivePost(idpost: number, post: FNPost): Observable<any>{
        post.active = 0;
        return from(this.postRepository.update(idpost, post));
    }
}
