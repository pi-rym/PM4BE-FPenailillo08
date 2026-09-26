import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(): IUser[] {
        return this.usersService.getUsers();
    }

    @Get(":id")
    getUserById(): IUser {
        return "Este endpoint devuelve un usuario por id"
    }

    @Post()
    createUser(): IUser {
        return "Este endopint devuelve un nuevo usuario"
    }

    @Put()
    updateUser(): IUser {
        return "Este endpoint actualiza un usuario"
    }

}
