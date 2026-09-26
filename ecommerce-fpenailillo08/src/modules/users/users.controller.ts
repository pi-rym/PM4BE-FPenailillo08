import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(): IUser[] {
        return this.usersService.getUsers();
    }
}
