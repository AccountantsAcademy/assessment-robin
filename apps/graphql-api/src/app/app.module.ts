import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from '../posts/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { CommentModule } from '../comments/comment.module';

@Module({
  imports: [
    PostModule,
    UserModule,
    CommentModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        const userId = token.startsWith('Bearer ')
          ? token.slice(7, token.length)
          : token;
        return { userId };
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class AppModule {}
