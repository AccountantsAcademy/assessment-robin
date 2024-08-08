import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './comment.model';
import { CommentService } from './comment.service';
import { PostModule } from '../posts/post.module';
import { UserModule } from '../users/user.module';
import { LikeModule } from '../common/like.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    PostModule,
    UserModule,
    LikeModule,
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
