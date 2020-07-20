import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/models/post.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([PostEntity])
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
