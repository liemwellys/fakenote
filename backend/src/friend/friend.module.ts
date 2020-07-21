import { Module, Controller } from '@nestjs/common';
import { FriendService } from './service/friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from './models/friend.entity';
import { FriendController } from './controller/friend.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([FriendEntity])
  ],
  providers: [FriendService],
  controllers: [FriendController]
})
export class FriendModule {}
