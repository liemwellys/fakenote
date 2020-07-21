import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { FNPost } from '../models/post.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @Post()
    createPost(@Body()post: FNPost): Observable<FNPost | Object>{
        return this.postService.createPost(post).pipe(
            map((post: FNPost) => post),
            catchError(err => of({error: err.message}))
        );
    }

    @Put(':idPost')
    updatePost(@Param('idPost') idpost: string, @Body() post: FNPost): Observable<any>{
        return this.postService.updatePost(Number(idpost), post);
    }
    
    @Put(':idPost/deactive')
    deactivePost(@Param('idPost')idpost: string, @Body() post:FNPost): Observable<any>{
        return this.postService.deactivePost(Number(idpost), post);
    }
}
