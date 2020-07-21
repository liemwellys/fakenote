import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fakenote',
      // entities: ['src/**/**.entity{.ts,.js}'],
      entities: ['src/**/**.entity{.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    PostModule,
    FriendModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
