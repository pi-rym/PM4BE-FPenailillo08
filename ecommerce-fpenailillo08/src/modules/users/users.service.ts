import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async getUsers(): Promise<User[]> {
        return await this.usersRepository.getUsers();
    }

    async getUserById(id:string): Promise<User | null>{
        return await this.usersRepository.getUserById(id)
    }
}
