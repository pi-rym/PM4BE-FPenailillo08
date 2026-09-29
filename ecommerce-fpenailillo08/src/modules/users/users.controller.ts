import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { AuthGuard } from '../auth/auth.guard';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
    getUsers(): IUser[] {
        return this.usersService.getUsers();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getUserById(): string {
        return "Este endpoint devuelve un usuario por id"
    }

    @Post()
    createUser(): string {
        return "Este endopint devuelve un nuevo usuario"
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateUser(): string {
        return "Este endpoint actualiza un usuario"
    }

}
