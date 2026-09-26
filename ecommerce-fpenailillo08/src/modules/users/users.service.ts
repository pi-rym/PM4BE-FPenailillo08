import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './interfaces/user.interface';


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getUsers(): IUser[] {
        return this.usersRepository.getUsers();
    }
}
