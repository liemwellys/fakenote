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
        // const newPost = new PostEntity();
        // newPost.content = post.content;
        // newPost.userId = post.userId;
        return from(this.postRepository.save(post));
    }
    
    updatePost(idpost: number, post: FNPost): Observable<any>{
        delete post.userId;
        delete post.active;

        return from(this.postRepository.update(idpost, post));
    }

    deactivePost(idpost: number, post: FNPost): Observable<any>{
        delete post.idpost;
        delete post.content;  
        delete post.userId;      
        
        post.active = 0;
        return from(this.postRepository.update(idpost, post));
    }
}
