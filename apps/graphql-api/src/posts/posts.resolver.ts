import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './posts.model';
import { PostsService } from './posts.service';
import { CreatePostInputDTO } from './post.dto';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  async posts() {
    return this.postsService.findAll();
  }

  // Mutations

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInputDTO
  ): Promise<Post> {
    return this.postsService.createPost(createPostInput);
  }
}
