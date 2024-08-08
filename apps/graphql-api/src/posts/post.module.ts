import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.model';
import { PostService } from './post.service';
import { UserModule } from '../users/user.module';
import { LikeModule } from '../common/like.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
    LikeModule,
  ],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
