import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './posts.model';
import { PostsService } from './posts.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
