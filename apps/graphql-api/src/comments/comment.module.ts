import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './comment.model'
import { CommentService } from './comment.service';
import { PostModule } from '../posts/post.module'
import { UserModule } from '../users/user.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    PostModule,
    UserModule,
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
