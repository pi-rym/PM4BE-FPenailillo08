import { Controller, Get, Param, Post, Put, UseGuards, Body, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
    async getUsers(@Query("page")page:string = "1",@Query("limit")limit:string = "5"): Promise<User[]>  {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        //VALIDACION NAN
        //NO DEVOLVER PASSWORD
        
        return await this.usersService.getUsers(pageNumber,limitNumber);
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    async getUserById(@Param("id", ParseUUIDPipe)id: string): Promise<User | null> {
        return await this.usersService.getUserById(id);
        //NO DEVOLVER PASSWORD
    }

    @Post()
    async createUser(@Body()user:CreateUserDto): Promise<{id:string}> {
        const createdUser = await this.usersService.createUser(user)
        return {id: createdUser.id}
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    async updateUser(@Param("id", ParseUUIDPipe)id:string,@Body()user:UpdateUserDto): Promise<{id:string}> {
        const updatedUser = await this.usersService.updateUser(id,user)
        return {id:updatedUser.id} 
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteUser(@Param("id",ParseUUIDPipe)id:string): Promise<{id:string}>{
        const deletedUser = await this.usersService.deleteUser(id)
        return {id:deletedUser.id}
    }

}
