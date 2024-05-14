import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';

@Resolver(of => Users)
export class UsersResolver {
    constructor(private usersService: UsersService) { }

    @Mutation(returns => Users)
    async createUser(
        @Args('createUserData') createUserDto: CreateUserDto,
    ): Promise<Users> {
        return this.usersService.createUser(createUserDto);
    }

    @Query(returns => [Users])
    users(): Promise<Users[]> {
        return this.usersService.findAll();
    }
}
