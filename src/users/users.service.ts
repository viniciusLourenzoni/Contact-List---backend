import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/create-user.dto/update-user.dto';
import { SharedUtilsService } from 'src/shared/shared.utils.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private readonly hashService: SharedUtilsService,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
        const newUser = this.userRepository.create({
          ...createUserDto,
          password: hashedPassword,
        });
        await this.userRepository.save(newUser);
        return newUser;
      }

      async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new Error('User not found');
        }
    
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
    
        if (updateUserDto.password) {
          user.password = await this.hashService.hashPassword(updateUserDto.password);
        }
    
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
