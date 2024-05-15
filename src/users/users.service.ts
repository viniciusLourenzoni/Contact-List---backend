import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async createUser(createUser: CreateUserDto): Promise<Users> {
        const newUser = this.userRepository.create(createUser);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async updateUser(id: number, updateUser: CreateUserDto): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { id } });
        user.name = updateUser.name;
        user.email = updateUser.email;
        user.password = updateUser.password;
        await this.userRepository.save(user);
        return user;
    }

    async deleteUser(id: number): Promise<void> {
         await this.userRepository.delete(id);
    }

    async getAllUsers(): Promise<Users[]> {
        return await this.userRepository.find();
    }
}
