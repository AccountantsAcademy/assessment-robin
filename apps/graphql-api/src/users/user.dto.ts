import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInputDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
