import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInputDTO } from './comment.dto';
import { Comment } from './comment.model';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => Comment)
  async mostLikedComment() {
    return this.commentService.findMostLikedComment();
  }

  @Query(() => Number)
  async numberOfComments(@Args('postId', { type: () => ID }) postId: string) {
    return this.commentService.countComments(postId);
  }

  @Query(() => [Comment])
  async comments(
    @Args('postId', { type: () => ID }) postId: string,
    @Args('limit', { type: () => Number, nullable: true }) limit: number,
    @Args('skip', { type: () => Number, nullable: true }) skip: number,
    @Context('userId') userId: string
  ) {
    return this.commentService.findByPostId(postId, limit, skip, userId);
  }

  // mutations

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInputDTO
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentInput);
  }

  @Mutation(() => Comment)
  async toggleCommentLike(
    @Context('userId') userId: string,
    @Args('commentId', { type: () => ID }) commentId: string
  ): Promise<Comment> {
    return this.commentService.toggleCommentLike(commentId, userId);
  }
}
