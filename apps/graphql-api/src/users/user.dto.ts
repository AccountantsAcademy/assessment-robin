import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInputDTO {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
