import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCommentInputDTO {
  @Field(() => String)
  content: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => ID)
  postId: string;
}
