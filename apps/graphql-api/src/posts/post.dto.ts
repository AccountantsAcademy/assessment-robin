import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInputDTO {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  authorId: string;
}
