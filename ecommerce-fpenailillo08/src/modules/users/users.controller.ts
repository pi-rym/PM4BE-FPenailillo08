import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
    async getUsers(): Promise<User[]>  {
        return await this.usersService.getUsers();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    async getUserById(@Param("id")id: string): Promise<User | null> {
        return await this.usersService.getUserById(id);
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
