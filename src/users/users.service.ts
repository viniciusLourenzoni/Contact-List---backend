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

    findAll(): Promise<Users[]> {
        return this.userRepository.find();
    }
}
