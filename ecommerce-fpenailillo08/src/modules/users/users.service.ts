import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async getUsers(page:number,limit:number): Promise<User[]> {
        return await this.usersRepository.getUsers(page,limit);
    }

    async getUserById(id:string): Promise<Omit<User, "password" | "isAdmin">>{
        return await this.usersRepository.getUserById(id)
    }

    // async createUser(user:CreateUserDto): Promise<User>{
    //     return await this.usersRepository.createUser(user)
    // }

    async updateUser(id:string,user:UpdateUserDto): Promise<User>{
        return await this.usersRepository.updateUser(id,user)
    }

    async deleteUser(id:string): Promise<{id:string}>{
        return await this.usersRepository.deleteUser(id)
    }
}
