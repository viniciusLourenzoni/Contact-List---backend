import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}