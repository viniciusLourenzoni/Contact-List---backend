import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/create-user.dto/update-user.dto';

@Resolver(of => Users)
export class UsersResolver {
    constructor(private usersService: UsersService) { }

    @Mutation(returns => Users)
    async createUser(
        @Args('createUserData') createUserDto: CreateUserDto,
    ): Promise<Users> {
        return this.usersService.createUser(createUserDto);
    }

    @Mutation(returns => Users)
    async updtateUser(
        @Args('id') id: number,
        @Args('updateUserData') updateUserData: UpdateUserDto,
    ): Promise<Users> {
        return this.usersService.updateUser(id, updateUserData);
    }

    @Mutation(returns => Users)
    async deleteUser(@Args('id') id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    @Query(returns => [Users])
    async getAllUsers(): Promise<Users[]> {
        return this.usersService.getAllUsers();
    }
}
