import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.model';
import { PostService } from './post.service';
import { CreatePostInputDTO } from './post.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postsService: PostService) {}

  @Query(() => [Post])
  async posts(@Context('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Query(() => Post)
  async post(
    @Context('userId') userId: string,
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.postsService.findById(id, userId);
  }

  // Mutations

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInputDTO
  ): Promise<Post> {
    return this.postsService.createPost(createPostInput);
  }

  @Mutation(() => Post)
  async togglePostLike(
    @Args('postId', { type: () => ID }) postId: string,
    @Args('userId', { type: () => ID }) userId: string
  ): Promise<Post> {
    return this.postsService.togglePostLike(postId, userId);
  }
}
